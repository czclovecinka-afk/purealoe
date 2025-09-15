import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import ProductShowcase from './components/ProductShowcase.tsx';
import Reviews from './components/Reviews.tsx';
import CallToAction from './components/CallToAction.tsx';
import Footer from './components/Footer.tsx';
import CartSidebar from './components/CartSidebar.tsx';
import CheckoutPage from './components/CheckoutPage.tsx';
import OrderSuccess from './components/OrderSuccess.tsx';
import OrderCancel from './components/OrderCancel.tsx';
import { Product, CartItem, CustomerDetails } from './types.ts';
import ContactForm from './components/ContactForm.tsx';

// Stripe is loaded globally via a script tag, so we need to tell TypeScript about it.
declare global {
  interface Window {
    Stripe: any;
  }
}

const initialProduct: Product = {
  id: 'prod_SmBHENuJYsV52J', // ID produktu ze Stripe
  name: 'Aloe Vera Zklidňující Gel',
  price: 247,
  priceId: 'price_1RqculC4Cyuz0AUchCnJIx2H', // ID ceny produktu ze Stripe
  averageRating: 4.8,
  reviewCount: 125,
};

// Váš veřejný klíč ze Stripe - nahraďte reálným klíčem
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Rpw4NC4Cyuz0AUc8x2J2b1k8Z2P2f5m1y2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O';

type View = 'store' | 'checkout' | 'success' | 'cancel';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<View>('store');
  const [stripe, setStripe] = useState<any | null>(null);
  const [product, setProduct] = useState<Product>(initialProduct);
  const [lastSessionId, setLastSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handlePaymentResult = async () => {
        const query = new URLSearchParams(window.location.search);
        const paymentStatus = query.get('payment');
        const sessionId = query.get('session_id');

        if (!sessionId || sessionId === lastSessionId) {
            return;
        }

        setLastSessionId(sessionId); // Zaznamenáme si ID, abychom nespouštěli logiku vícekrát

        if (paymentStatus === 'success') {
            try {
                // Po úspěšné platbě zavoláme náš server, aby odeslal potvrzovací e-mail.
                // Toto je mnohem spolehlivější než odesílání z klienta.
                const response = await fetch('/api/send-confirmation-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId }),
                });
                if (!response.ok) {
                    console.error("Server failed to send confirmation email.");
                }
            } catch (error) {
                console.error("Error calling confirmation email endpoint:", error);
            } finally {
                setView('success');
                setCartItems([]); // Vyprázdníme košík
            }
        } else if (paymentStatus === 'cancel') {
            setView('cancel');
        }
        
        // Vyčistíme URL, aby se při obnovení stránky akce neopakovala
        window.history.replaceState({}, '', window.location.pathname);
    };
    
    handlePaymentResult();
    
    // Inicializace Stripe
    if (window.Stripe) {
        setStripe(window.Stripe(STRIPE_PUBLISHABLE_KEY));
    } else {
        const stripeScript = document.getElementById('stripe-js');
        if (stripeScript) {
            stripeScript.addEventListener('load', () => {
                if (window.Stripe) {
                    setStripe(window.Stripe(STRIPE_PUBLISHABLE_KEY));
                }
            });
        }
    }
  }, [lastSessionId]);

  const handleAddToCart = () => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
  };

  const handleGoHome = () => {
    setView('store');
  }

  const handleProcessPayment = async (customerDetails: CustomerDetails) => {
    if (!stripe) {
      alert('Platební brána se ještě načítá. Zkuste to prosím za okamžik.');
      return;
    }
    setIsLoading(true);

    try {
      // Krok 1: Zavoláme náš vlastní serverový endpoint, aby vytvořil Stripe Checkout Session.
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems, customerEmail: customerDetails.email }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        console.error("Payment processing failed with non-JSON response:", errorText);
        throw new Error('Komunikace se serverem selhala. Zkuste to prosím o chvíli později.');
      }
      
      const data = await response.json();

      if (!response.ok) {
        // Pokud server vrátil chybový stav, použijeme zprávu z JSON těla
        throw new Error(data.message || 'Serveru se nepodařilo připravit platbu.');
      }
      
      const { sessionId } = data;

      // Krok 2: Přesměrujeme zákazníka na platební stránku Stripe pomocí získaného ID.
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        // Tato chyba nastane, pokud přesměrování selže (velmi vzácné).
        throw new Error(error.message);
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      const errorMessage = (err instanceof Error) ? err.message : 'Došlo k neznámé chybě.';
      alert(`Při zpracování platby došlo k chybě: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderContent = () => {
    switch (view) {
      case 'checkout':
        return <CheckoutPage onProcessPayment={handleProcessPayment} onBackToStore={handleGoHome} isLoading={isLoading} />;
      case 'success':
        return <OrderSuccess onGoHome={handleGoHome} />;
      case 'cancel':
        return <OrderCancel onGoHome={handleGoHome} />;
      case 'store':
      default:
        return (
          <>
            <Hero onAddToCart={handleAddToCart} />
            <Features />
            <ProductShowcase product={product} onAddToCart={handleAddToCart} />
            <CallToAction onAddToCart={handleAddToCart} />
            <Reviews />
            <ContactForm />
          </>
        );
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen font-sans text-brand-text">
      <Header cartCount={cartCount} onCartClick={handleCartClick} />
      <main>
        {renderContent()}
      </main>
      <Footer />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleGoToCheckout}
      />
    </div>
  );
};

export default App;