import React from 'react';

interface HeroProps {
  onAddToCart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAddToCart }) => {
  return (
    <section className="container mx-auto px-6 py-24 text-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="md:w-1/2 md:text-left">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-green-dark mb-6 leading-tight">Čistá síla přírody pro vaši pokožku</h1>
          <p className="text-xl text-brand-text/80 mb-10">Objevte zklidňující a hydratační účinky našeho 100% organického gelu z Aloe Vera.</p>
          <button 
            onClick={onAddToCart} 
            className="bg-brand-green text-white font-bold py-4 px-8 rounded-full hover:bg-brand-green-dark transition-all duration-300 text-lg shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform"
          >
            Přidat do košíku
          </button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img src="/assets/hero-image.jpg" alt="Žena si nanáší na obličej zklidňující gel PureAloe" className="rounded-2xl shadow-soft-lg animate-float" />
        </div>
      </div>
    </section>
  );
};

export default Hero;