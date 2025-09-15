import React from 'react';
import { Product } from '../types.ts';

interface ProductShowcaseProps {
  product: Product;
  onAddToCart: () => void;
}

const StarIcon = ({ className }: { className: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);

const StarRatingDisplay = ({ rating }: { rating: number }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return <StarIcon key={i} className={`w-5 h-5 ${starValue <= rating ? 'text-yellow-400' : 'text-gray-300'}`} />;
        })}
    </div>
);


const ProductShowcase: React.FC<ProductShowcaseProps> = ({ product, onAddToCart }) => {
  return (
    <section id="product" className="bg-brand-cream py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-serif font-bold text-brand-green-dark mb-16">Náš Hvězdný Produkt</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-white rounded-2xl shadow-soft-lg p-12 max-w-5xl mx-auto">
          <div className="md:w-1/3">
            <img src="/assets/product-image.jpg" alt="Detail produktu PureAloe - organický gel v kelímku" className="rounded-2xl shadow-soft" />
          </div>
          <div className="md:w-2/3 text-left">
            <h3 className="text-3xl font-serif font-bold text-brand-green-dark">{product.name}</h3>
            {/* Average Rating Display */}
            {typeof product.averageRating === 'number' && typeof product.reviewCount === 'number' && (
              <div className="flex items-center gap-2 text-brand-text/80 my-4">
                  <StarRatingDisplay rating={product.averageRating} />
                  <span className="font-semibold">{product.averageRating.toFixed(1)} z 5</span>
                  <span className="text-sm">({product.reviewCount} hodnocení)</span>
              </div>
            )}
            <p className="text-brand-text/80 my-6 text-lg">Dopřejte své pokožce tu nejčistší péči s naším 100% organickým gelem z Aloe Vera. Perfektní pro hydrataci, zklidnění po slunci a každodenní regeneraci.</p>
            <div className="my-6 flex items-baseline gap-4">
              <span className="text-5xl font-serif font-bold text-brand-green-dark">{product.price} Kč</span>
              <span className="text-3xl font-serif text-brand-text/50 line-through">499 Kč</span>
            </div>
            <button 
              onClick={onAddToCart} 
              className="w-full md:w-auto bg-brand-green text-white font-bold py-4 px-10 rounded-full hover:bg-brand-green-dark transition-all duration-300 text-lg shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform"
            >
              Přidat do košíku
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;