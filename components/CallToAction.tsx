import React from 'react';

interface CallToActionProps {
    onAddToCart: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onAddToCart }) => {
    return (
        <section id="cta" className="bg-brand-green py-24 text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Připraveni na změnu?</h2>
                <p className="text-xl max-w-2xl mx-auto mb-10">Dopřejte své pokožce péči, kterou si zaslouží. Objednejte si PureAloe ještě dnes.</p>
                <button 
                  onClick={onAddToCart} 
                  className="bg-white text-brand-green-dark font-bold py-4 px-10 rounded-full hover:bg-brand-cream transition-all duration-300 text-lg shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform"
                >
                    Chci zdravou pleť
                </button>
            </div>
        </section>
    );
};

export default CallToAction;