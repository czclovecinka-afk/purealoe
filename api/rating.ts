// A minimal type definition for the request body.
interface RatingRequestBody {
  productId: string;
  rating: number;
}

// These are placeholder types for a generic serverless environment (like Vercel or Netlify).
// They help with type-checking without needing to install platform-specific packages.
interface ServerlessRequest {
  method?: string;
  body: RatingRequestBody;
}

interface ServerlessResponse {
  status: (code: number) => {
    json: (body: any) => void;
  };
}

/**
 * Serverless function to handle product rating submissions.
 * This function is designed to run on a Node.js-based serverless platform.
 */
export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { productId, rating } = req.body;

    // Basic validation
    if (!productId || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Neplatné údaje pro hodnocení. Zkontrolujte, zda jste vybrali 1-5 hvězdiček.' });
    }

    // --- Database Logic Would Go Here ---
    // In a real-world application, you would:
    // 1. Connect to your database (e.g., PostgreSQL, MongoDB, Firebase).
    // 2. Find the product by `productId`.
    // 3. Add the new `rating` to a list of ratings for that product.
    // 4. Recalculate the product's average rating and review count.
    // 5. Save the updated product information back to the database.
    
    // For this example, we'll just log the received data to the server console
    // to simulate a successful backend operation.
    console.log(`Received rating for product ${productId}: ${rating} stars`);

    // You could also return the new average rating to the client.
    // const { newAverageRating, newReviewCount } = await saveRatingToDb(productId, rating);

    return res.status(200).json({
      message: 'Hodnocení bylo úspěšně zaznamenáno. Děkujeme!',
      // newAverage: newAverageRating,
      // newReviewCount: newReviewCount
    });

  } catch (error) {
    console.error('Error in /api/rating:', error);
    return res.status(500).json({ message: 'Na straně serveru došlo k chybě.' });
  }
}