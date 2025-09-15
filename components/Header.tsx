import React from 'react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  return (
    <header className="bg-brand-cream/80 backdrop-blur-lg shadow-soft sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-serif font-bold text-brand-green-dark">PureAloe</div>
        <div className="flex items-center">
          <button onClick={onCartClick} className="relative text-gray-700 hover:text-brand-green transition-colors duration-300 ml-4 focus:outline-none focus:ring-2 focus:ring-brand-green/50 rounded-full" aria-label={`Nákupní košík, ${cartCount} položek`}>
            <ShoppingCartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartCount}</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;