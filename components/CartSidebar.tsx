import React from 'react';
import { CartItem } from '../types.ts';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id:string) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-40`} onClick={onClose}></div>
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-cream shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-serif font-bold text-brand-green-dark">Váš košík</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-4xl font-light" aria-label="Zavřít košík">&times;</button>
          </div>
          
          {items.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-gray-500">Váš košík je prázdný.</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-6 space-y-5">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-brand-text">{item.name}</h3>
                    <p className="text-gray-600">{item.price} Kč</p>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 text-center border border-gray-200 rounded-md mx-4 py-1"
                      min="1"
                      aria-label={`Množství pro ${item.name}`}
                    />
                    <button onClick={() => onRemoveItem(item.id)} className="text-sm text-red-500 hover:text-red-700 hover:underline" aria-label={`Odebrat ${item.name}`}>Odebrat</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="flex justify-between font-bold text-lg mb-5">
                <span className="text-brand-text">Mezisoučet:</span>
                <span className="text-brand-green-dark">{subtotal} Kč</span>
              </div>
              <button onClick={onCheckout} className="w-full bg-brand-green text-white font-bold py-3 rounded-full hover:bg-brand-green-dark transition-all duration-300 shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform">
                Přejít k pokladně
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;