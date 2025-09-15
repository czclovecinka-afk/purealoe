// A minimal type definition for the request body.
interface ContactFormBody {
  name: string;
  email: string;
  message: string;
}

// These are placeholder types for a generic serverless environment (like Vercel or Netlify).
// They help with type-checking without needing to install platform-specific packages.
interface ServerlessRequest {
  method?: string;
  body: ContactFormBody;
}

interface ServerlessResponse {
  status: (code: number) => {
    json: (body: any) => void;
  };
}

/**
 * Serverless function to handle contact form submissions.
 * This function is designed to run on a Node.js-based serverless platform.
 * It securely handles API keys and communicates with Ecomail.
 */
export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Environment variables must be set in your hosting provider's dashboard.
  const {
    ECOMAIL_API_KEY,
    ECOMAIL_LIST_ID = '2',
    NOTIFICATION_RECIPIENT_EMAIL = 'LukasVasicek@seznam.cz',
    NOTIFICATION_SENDER_EMAIL = 'notifikace@vas-eshop.cz'
  } = process.env;

  if (!ECOMAIL_API_KEY) {
    console.error('Server configuration error: Missing ECOMAIL_API_KEY.');
    return res.status(500).json({ message: 'Internal server error due to misconfiguration.' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Prosím, vyplňte všechna povinná pole.' });
  }

  try {
    // Step 1: Subscribe user to the Ecomail list (fire-and-forget).
    const subscribeData = {
      subscriber_data: { email, name, custom_fields: { zprava: message } },
      resubscribe: true,
      skip_confirmation: true,
    };

    fetch(`https://api2.ecomailapp.cz/lists/${ECOMAIL_LIST_ID}/subscribe`, {
      method: 'POST',
      headers: { 'key': ECOMAIL_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(subscribeData),
    }).catch(e => console.error("Failed to subscribe user to Ecomail list:", e));

    // Step 2: Send a notification email using Ecomail Transactional API.
    const emailHtmlBody = `
      <h1>Nový dotaz z PureAloe</h1>
      <p><strong>Od:</strong> ${name} (${email})</p>
      <p><strong>Zpráva:</strong></p>
      <blockquote style="border-left: 4px solid #ccc; padding-left: 1rem; margin: 0 0 1rem 0;">${message.replace(/\n/g, '<br>')}</blockquote>
    `;

    const emailData = {
      message: {
        subject: `Nový dotaz od ${name} | PureAloe`,
        from_name: "Web PureAloe",
        from_email: NOTIFICATION_SENDER_EMAIL,
        reply_to: email,
        to: [{ email: NOTIFICATION_RECIPIENT_EMAIL }],
        html: emailHtmlBody,
      }
    };

    const transactionalResponse = await fetch('https://api2.ecomailapp.cz/transactional-emails', {
      method: 'POST',
      headers: { 'key': ECOMAIL_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    });

    if (!transactionalResponse.ok) {
      const errorBody = await transactionalResponse.json();
      console.error('Ecomail transactional email failed:', errorBody);
      throw new Error('Nepodařilo se odeslat notifikační e-mail.');
    }

    return res.status(200).json({ message: 'Formulář byl úspěšně odeslán.' });

  } catch (error) {
    console.error('Error in /api/contact:', error);
    const errorMessage = error instanceof Error ? error.message : 'Došlo k neočekávané chybě.';
    return res.status(500).json({ message: errorMessage });
  }
}