export interface Product {
  id: string;
  name: string;
  price: number;
  priceId: string; // ID ceny produktu ve Stripe
  averageRating?: number;
  reviewCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
    name: string;
    email: string;
    street?: string; // Adresa je nyní volitelná, sbírá ji Stripe
    city?: string;
    postalCode?: string;
    country?: string;
}
