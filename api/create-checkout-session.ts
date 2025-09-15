import Stripe from 'stripe';
import type { CartItem } from '../types';

// Minimalistické typy pro serverless prostředí (např. Vercel, Netlify)
interface ServerlessRequest {
  method?: string;
  body: {
    items: CartItem[];
    customerEmail: string;
  };
  headers: {
    [key: string]: string | string[] | undefined;
  };
}

interface ServerlessResponse {
  setHeader: (key: string, value: string) => void;
  status: (code: number) => {
    json: (body: any) => void;
    end: (body?: string) => void;
  };
}

// Inicializace Stripe s tajným klíčem ze serverového prostředí
// Ujistěte se, že proměnná STRIPE_SECRET_KEY je nastavena ve vašem hostingu.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { items, customerEmail } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Košík je prázdný.' });
    }

    // Transformace položek košíku do formátu, který vyžaduje Stripe API
    const lineItems = items.map(item => ({
      price: item.priceId,
      quantity: item.quantity,
    }));
    
    // Origin URL pro přesměrování po platbě
    const origin = req.headers.origin || 'http://localhost:3000';

    // Vytvoření platební relace (Session)
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment=cancel`,
      locale: 'cs',
      customer_email: customerEmail,
      shipping_address_collection: {
        allowed_countries: ['CZ', 'SK', 'DE', 'PL', 'AT'],
      },
      billing_address_collection: 'auto',
    });

    // Odeslání ID relace zpět na frontend
    res.status(200).json({ sessionId: session.id });

  } catch (err) {
    console.error('Stripe session creation error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error.';
    res.status(500).json({ message: 'Chyba při vytváření platební relace.', error: errorMessage });
  }
}