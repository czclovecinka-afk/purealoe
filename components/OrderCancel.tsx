import React from 'react';

interface OrderCancelProps {
  onGoHome: () => void;
}

const OrderCancel: React.FC<OrderCancelProps> = ({ onGoHome }) => {
  return (
    <div className="container mx-auto px-6 py-24 text-center">
      <div className="max-w-lg mx-auto bg-white p-12 rounded-2xl shadow-soft-lg">
        <h1 className="text-3xl font-serif font-bold text-red-600 mb-4">Platba byla zrušena</h1>
        <p className="text-brand-text/80 mb-8">Vaše platba nebyla dokončena. Můžete se vrátit do obchodu a zkusit to znovu.</p>
        <button onClick={onGoHome} className="bg-brand-green text-white font-bold py-3 px-8 rounded-full hover:bg-brand-green-dark transition-all duration-300 shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform">
          Zpět na hlavní stránku
        </button>
      </div>
    </div>
  );
};

export default OrderCancel;