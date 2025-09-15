import Stripe from 'stripe';

// Minimalistické typy pro serverless prostředí
interface ServerlessRequest {
  method?: string;
  body: {
    sessionId?: string;
  };
}

interface ServerlessResponse {
  status: (code: number) => {
    json: (body: any) => void;
  };
}

// Inicializace Stripe s tajným klíčem
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

// Funkce pro formátování adresy
const formatAddress = (address: Stripe.Address | null | undefined): string => {
  if (!address) return 'Adresa neuvedena';
  return [address.line1, address.line2, `${address.postal_code} ${address.city}`, address.country]
    .filter(Boolean)
    .join('<br>');
};

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    ECOMAIL_API_KEY,
    NOTIFICATION_RECIPIENT_EMAIL = 'LukasVasicek@seznam.cz',
    NOTIFICATION_SENDER_EMAIL = 'objednavky@purealoe-eshop.cz'
  } = process.env;

  if (!ECOMAIL_API_KEY || !NOTIFICATION_RECIPIENT_EMAIL) {
    console.error('Server configuration error: Missing Ecomail or Stripe environment variables.');
    return res.status(500).json({ message: 'Internal server error due to misconfiguration.' });
  }

  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: 'Chybí ID platební relace.' });
    }

    // Načtení detailů relace ze Stripe pro ověření platby
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product', 'customer'],
    });

    // Ověření, zda byla platba skutečně úspěšná
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: `Platba nebyla dokončena (stav: ${session.payment_status}).` });
    }

    const customerDetails = session.customer_details;
    const shippingDetails = session.shipping_details;
    const lineItems = session.line_items?.data || [];
    
    // Sestavení obsahu e-mailu
    const itemsHtml = lineItems.map(item => {
        const product = item.price?.product as Stripe.Product;
        return `
            <tr>
                <td style="padding: 5px; border-bottom: 1px solid #eee;">${product.name}</td>
                <td style="padding: 5px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity} ks</td>
                <td style="padding: 5px; border-bottom: 1px solid #eee; text-align: right;">${(item.amount_total / 100).toFixed(2)} Kč</td>
            </tr>
        `;
    }).join('');

    const emailHtmlBody = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #3A5B4F;">Nová objednávka z PureAloe!</h1>
        <p>Právě jste obdrželi novou objednávku. Gratulujeme!</p>
        
        <h2 style="color: #3A5B4F; border-bottom: 2px solid #61B56E; padding-bottom: 5px;">Detaily zákazníka</h2>
        <p>
          <strong>Jméno:</strong> ${shippingDetails?.name || 'Neuvedeno'}<br>
          <strong>E-mail:</strong> ${customerDetails?.email || 'Neuvedeno'}
        </p>
        <p>
          <strong>Doručovací adresa:</strong><br>
          ${formatAddress(shippingDetails?.address)}
        </p>

        <h2 style="color: #3A5B4F; border-bottom: 2px solid #61B56E; padding-bottom: 5px;">Položky objednávky</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 5px;">Produkt</th>
              <th style="text-align: center; padding: 5px;">Množství</th>
              <th style="text-align: right; padding: 5px;">Cena</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <h3 style="text-align: right; margin-top: 20px;">
          Celkem: <strong style="color: #3A5B4F;">${(session.amount_total! / 100).toFixed(2)} Kč</strong>
        </h3>
        <hr>
        <p style="font-size: 0.8em; color: #777;">Tento e-mail byl vygenerován automaticky na základě úspěšné platby přes Stripe (Session ID: ${session.id}).</p>
      </div>
    `;

    // Data pro Ecomail transakční API
    const emailData = {
      message: {
        subject: `Nová objednávka #${session.id.slice(-6)} | PureAloe`,
        from_name: "Web PureAloe",
        from_email: NOTIFICATION_SENDER_EMAIL,
        reply_to: customerDetails?.email,
        to: [{ email: NOTIFICATION_RECIPIENT_EMAIL }],
        html: emailHtmlBody,
      }
    };

    // Odeslání e-mailu přes Ecomail
    const response = await fetch('https://api2.ecomailapp.cz/transactional-emails', {
      method: 'POST',
      headers: { 'key': ECOMAIL_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Ecomail transactional email failed:', errorBody);
      throw new Error('Nepodařilo se odeslat notifikační e-mail přes Ecomail.');
    }

    return res.status(200).json({ message: 'Potvrzovací e-mail byl úspěšně odeslán.' });

  } catch (error) {
    console.error('Error in /api/send-confirmation-email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Došlo k neočekávané chybě.';
    return res.status(500).json({ message: errorMessage });
  }
}