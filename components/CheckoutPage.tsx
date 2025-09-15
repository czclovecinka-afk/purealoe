import React, { useState } from 'react';
import { CustomerDetails } from '../types.ts';

interface CheckoutPageProps {
  onProcessPayment: (customerDetails: Omit<CustomerDetails, 'street' | 'city' | 'postalCode' | 'country'>) => void;
  onBackToStore: () => void;
  isLoading: boolean;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onProcessPayment, onBackToStore, isLoading }) => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(customer).every(field => field.trim() !== '')) {
      onProcessPayment(customer);
    } else {
      alert('Prosím, vyplňte všechna pole.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl lg:text-5xl font-serif font-bold text-center text-brand-green-dark mb-12">Pokladna</h1>
      <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-soft-lg">
        
        <form id="checkout-form" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-serif font-bold mb-8 text-brand-green-dark">Kontaktní údaje</h2>
          <div className="grid grid-cols-1 gap-6">
            <input name="name" value={customer.name} onChange={handleInputChange} placeholder="Celé jméno" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-shadow" required disabled={isLoading} />
            <input name="email" type="email" value={customer.email} onChange={handleInputChange} placeholder="E-mail" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-shadow" required disabled={isLoading} />
          </div>
          <p className="text-sm text-gray-500 mt-4">Kompletní doručovací adresu zadáte v dalším kroku na zabezpečené platební bráně Stripe.</p>
        </form>
        
        <div className="mt-10">
            <button 
              form="checkout-form" 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-brand-green text-white font-bold py-4 rounded-full hover:bg-brand-green-dark transition-all duration-300 shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform disabled:opacity-50 disabled:cursor-wait"
            >
                {isLoading ? 'Zpracovávám...' : 'Přejít k platbě'}
            </button>
            <button onClick={onBackToStore} className="w-full mt-4 text-brand-green hover:underline transition duration-300" disabled={isLoading}>
                &larr; Zpět do obchodu
            </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
