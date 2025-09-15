import React from "https://esm.sh/react@18.3.1";
import ReactDOM from "https://esm.sh/react-dom@18.3.1/client";

// Protože jsme v souboru JS, budeme používat React přímo
const e = React.createElement;

// --- Všechny komponenty v jednom souboru ---

const ShoppingCartIcon = () => (
    e('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        e('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" })
    )
);

const Header = ({ cartCount, onCartClick }) => {
  return e('header', { className: "bg-brand-cream/80 backdrop-blur-lg shadow-soft sticky top-0 z-50" },
    e('nav', { className: "container mx-auto px-6 py-4 flex justify-between items-center" },
      e('div', { className: "text-2xl font-serif font-bold text-brand-green-dark" }, "PureAloe"),
      e('div', { className: "flex items-center" },
        e('button', { onClick: onCartClick, className: "relative text-gray-700 hover:text-brand-green transition-colors duration-300 ml-4 focus:outline-none focus:ring-2 focus:ring-brand-green/50 rounded-full", "aria-label": `Nákupní košík, ${cartCount} položek` },
          e(ShoppingCartIcon),
          cartCount > 0 && e('span', { className: "absolute -top-2 -right-2 bg-brand-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold" }, cartCount)
        )
      )
    )
  );
};

const Hero = ({ onAddToCart }) => {
  return e('section', { className: "container mx-auto px-6 py-24 text-center" },
    e('div', { className: "flex flex-col md:flex-row items-center justify-center gap-12" },
      e('div', { className: "md:w-1/2 md:text-left" },
        e('h1', { className: "text-5xl md:text-6xl font-serif font-bold text-brand-green-dark mb-6 leading-tight" }, "Čistá síla přírody pro vaši pokožku"),
        e('p', { className: "text-xl text-brand-text/80 mb-10" }, "Objevte zklidňující a hydratační účinky našeho 100% organického gelu z Aloe Vera."),
        e('button', { onClick: onAddToCart, className: "bg-brand-green text-white font-bold py-4 px-8 rounded-full hover:bg-brand-green-dark transition-all duration-300 text-lg shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform" }, "Přidat do košíku")
      ),
      e('div', { className: "md:w-1/2 mt-10 md:mt-0" },
        e('img', { src: "/assets/hero-image.jpg", alt: "Žena si nanáší na obličej zklidňující gel PureAloe", className: "rounded-2xl shadow-soft-lg animate-float" })
      )
    )
  );
};

const FeatureIconWrapper = ({ children }) => e('div', { className: "bg-brand-accent/50 rounded-full p-5 mb-6 inline-flex" }, children);
const LeafIcon = () => e('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-brand-green", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, e('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0 1.172 1.953 1.172 5.119 0 7.072z" }), e('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21a9.004 9.004 0 008.32-6.002 9.003 9.003 0 00-16.64 0A9.004 9.004 0 0012 21z" }));
const DropIcon = () => e('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-brand-green", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, e('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3.702c-1.207 1.206-2.415 2.413-3.622 3.62-1.206 1.207-2.413 2.414-3.62 3.621-1.207 1.207-1.782 2.58-1.782 4.057 0 3.314 2.686 6 6 6s6-2.686 6-6c0-1.477-.575-2.85-1.782-4.057-1.207-1.207-2.414-2.414-3.62-3.621-1.207-1.207-2.415-2.414-3.622-3.62z" }));
const ShieldCheckIcon = () => e('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-brand-green", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1 }, e('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.955a12.02 12.02 0 009 2.045 12.02 12.02 0 009-2.045c0-2.624-.508-5.116-1.382-7.371z" }));

const Features = () => {
    return e('section', { id: "features", className: "bg-white py-24" },
        e('div', { className: "container mx-auto px-6 text-center" },
            e('h2', { className: "text-4xl font-serif font-bold text-brand-green-dark mb-16" }, "Proč si zamilujete PureAloe"),
            e('div', { className: "flex flex-col md:flex-row justify-center items-center gap-16" },
                e('div', { className: "flex flex-col items-center max-w-xs" },
                    e(FeatureIconWrapper, null, e(LeafIcon)),
                    e('h3', { className: "text-2xl font-serif font-bold mb-4 text-brand-green-dark" }, "100% Organické"),
                    e('p', { className: "text-brand-text/80" }, "Pěstováno bez pesticidů a herbicidů pro maximální čistotu a účinnost.")
                ),
                e('div', { className: "flex flex-col items-center max-w-xs" },
                    e(FeatureIconWrapper, null, e(DropIcon)),
                    e('h3', { className: "text-2xl font-serif font-bold mb-4 text-brand-green-dark" }, "Hloubková Hydratace"),
                    e('p', { className: "text-brand-text/80" }, "Okamžitě se vstřebává a zanechává pokožku svěží, hydratovanou a bez pocitu mastnoty.")
                ),
                e('div', { className: "flex flex-col items-center max-w-xs" },
                   e(FeatureIconWrapper, null, e(ShieldCheckIcon)),
                    e('h3', { className: "text-2xl font-serif font-bold mb-4 text-brand-green-dark" }, "Zklidnění a Regenerace"),
                    e('p', { className: "text-brand-text/80" }, "Ideální pro zklidnění podrážděné pokožky po slunění, holení nebo bodnutí hmyzem.")
                )
            )
        )
    );
};

const StarIcon = ({ className }) => e('svg', { className: className, fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" }, e('path', { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }));
const StarRatingDisplay = ({ rating }) => e('div', { className: "flex" }, [...Array(5)].map((_, i) => e(StarIcon, { key: i, className: `w-5 h-5 ${i + 1 <= rating ? 'text-yellow-400' : 'text-gray-300'}` })));

const ProductShowcase = ({ product, onAddToCart }) => {
  return e('section', { id: "product", className: "bg-brand-cream py-24" },
    e('div', { className: "container mx-auto px-6 text-center" },
      e('h2', { className: "text-4xl font-serif font-bold text-brand-green-dark mb-16" }, "Náš Hvězdný Produkt"),
      e('div', { className: "flex flex-col md:flex-row items-center justify-center gap-12 bg-white rounded-2xl shadow-soft-lg p-12 max-w-5xl mx-auto" },
        e('div', { className: "md:w-1/3" },
          e('img', { src: "/assets/product-image.jpg", alt: "Detail produktu PureAloe - organický gel v kelímku", className: "rounded-2xl shadow-soft" })
        ),
        e('div', { className: "md:w-2/3 text-left" },
          e('h3', { className: "text-3xl font-serif font-bold text-brand-green-dark" }, product.name),
          typeof product.averageRating === 'number' && typeof product.reviewCount === 'number' && (
            e('div', { className: "flex items-center gap-2 text-brand-text/80 my-4" },
              e(StarRatingDisplay, { rating: product.averageRating }),
              e('span', { className: "font-semibold" }, `${product.averageRating.toFixed(1)} z 5`),
              e('span', { className: "text-sm" }, `(${product.reviewCount} hodnocení)`)
            )
          ),
          e('p', { className: "text-brand-text/80 my-6 text-lg" }, "Dopřejte své pokožce tu nejčistší péči s naším 100% organickým gelem z Aloe Vera. Perfektní pro hydrataci, zklidnění po slunci a každodenní regeneraci."),
          e('div', { className: "my-6 flex items-baseline gap-4" },
            e('span', { className: "text-5xl font-serif font-bold text-brand-green-dark" }, `${product.price} Kč`),
            e('span', { className: "text-3xl font-serif text-brand-text/50 line-through" }, "499 Kč")
          ),
          e('button', { onClick: onAddToCart, className: "w-full md:w-auto bg-brand-green text-white font-bold py-4 px-10 rounded-full hover:bg-brand-green-dark transition-all duration-300 text-lg shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform" }, "Přidat do košíku")
        )
      )
    )
  );
};

const ReviewCard = ({ name, text, stars, imgSrc }) => e('div', { className: "bg-white p-8 rounded-2xl shadow-soft max-w-sm mx-auto h-full flex flex-col transition-transform duration-300 hover:-translate-y-2" },
    e('div', { className: "flex items-center mb-5" },
        e('img', { className: "w-14 h-14 rounded-full mr-5 object-cover", src: imgSrc, alt: `Profilová fotka ${name}` }),
        e('div', null,
            e('h4', { className: "text-xl font-bold text-brand-green-dark" }, name),
            e('div', { className: "flex mt-1" },
                [...Array(5)].map((_, i) => e(StarIcon, { key: i, className: `w-5 h-5 ${i < stars ? 'text-yellow-400' : 'text-gray-300'}` }))
            )
        )
    ),
    e('p', { className: "text-brand-text/80 italic" }, `"${text}"`)
);

const Reviews = () => {
    const reviewsData = [
        { name: "Jana N.", text: "Tento gel je zázrak! Moje pleť nebyla nikdy tak hydratovaná a zklidněná. Používám ho každý den.", stars: 5, imgSrc: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2" },
        { name: "Petr S.", text: "Perfektní po opalování. Okamžitě chladí a zabraňuje loupání kůže. V létě nezbytnost.", stars: 5, imgSrc: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2" },
        { name: "Eva K.", text: "Konečně něco, co pomohlo na mou citlivou pleť. Žádné podráždění, jen příjemný pocit. Doporučuji!", stars: 5, imgSrc: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2" },
    ];
    return e('section', { id: "reviews", className: "py-24 bg-white" },
        e('div', { className: "container mx-auto px-6 text-center" },
            e('h2', { className: "text-4xl font-serif font-bold text-brand-green-dark mb-16" }, "Co říkají naši zákazníci"),
            e('div', { className: "grid md:grid-cols-3 gap-10" },
                reviewsData.map((review, index) => e(ReviewCard, { key: index, ...review }))
            )
        )
    );
};

const CallToAction = ({ onAddToCart }) => {
    return e('section', { id: "cta", className: "bg-brand-green py-24 text-white" },
        e('div', { className: "container mx-auto px-6 text-center" },
            e('h2', { className: "text-4xl md:text-5xl font-serif font-bold mb-6" }, "Připraveni na změnu?"),
            e('p', { className: "text-xl max-w-2xl mx-auto mb-10" }, "Dopřejte své pokožce péči, kterou si zaslouží. Objednejte si PureAloe ještě dnes."),
            e('button', { onClick: onAddToCart, className: "bg-white text-brand-green-dark font-bold py-4 px-10 rounded-full hover:bg-brand-cream transition-all duration-300 text-lg shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform" }, "Chci zdravou pleť")
        )
    );
};

const ContactForm = () => {
    const [status, setStatus] = React.useState('idle');
    const [formMessage, setFormMessage] = React.useState('');
    const formSubmitUrl = 'https://formspree.io/f/xovnznqd';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('sending');
        setFormMessage('Odesílání...');

        const formData = new FormData(event.currentTarget);
        formData.append('_subject', `Nový dotaz z PureAloe od ${formData.get('name')}`);

        try {
            const response = await fetch(formSubmitUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                setFormMessage('Zpráva byla úspěšně odeslána! Děkujeme.');
                event.currentTarget.reset();
            } else {
                setStatus('error');
                setFormMessage('Něco se pokazilo. Zkuste to prosím znovu.');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            setStatus('error');
            setFormMessage('Došlo k chybě při odesílání. Zkontrolujte připojení k internetu.');
        }
    };

    return e('section', { id: "contact", className: "py-24 bg-brand-cream" },
        e('div', { className: "container mx-auto px-6" },
            e('div', { className: "max-w-2xl mx-auto text-center" },
                e('h2', { className: "text-4xl font-serif font-bold text-brand-green-dark mb-4" }, "Máte dotaz?"),
                e('p', { className: "text-brand-text/80 mb-12" }, "Neváhejte nás kontaktovat. Jsme tu pro vás.")
            ),
            e('form', {
                onSubmit: handleSubmit,
                className: "max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-soft-lg"
            },
                e('div', { className: "mb-6" },
                    e('label', { htmlFor: "name", className: "block text-brand-text font-bold mb-2" }, "Jméno"),
                    e('input', { type: "text", id: "name", name: "name", className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-shadow", required: true })
                ),
                e('div', { className: "mb-6" },
                    e('label', { htmlFor: "email", className: "block text-brand-text font-bold mb-2" }, "E-mail"),
                    e('input', { type: "email", id: "email", name: "email", className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-shadow", required: true })
                ),
                e('div', { className: "mb-8" },
                    e('label', { htmlFor: "message", className: "block text-brand-text font-bold mb-2" }, "Zpráva"),
                    e('textarea', { id: "message", name: "message", rows: 5, className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-shadow", required: true })
                ),
                e('div', { className: "text-center" },
                    e('button', {
                        type: "submit",
                        disabled: status === 'sending',
                        className: "bg-brand-green text-white font-bold py-3 px-8 rounded-full hover:bg-brand-green-dark transition-all duration-300 shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform disabled:opacity-50 disabled:cursor-not-allowed"
                    }, status === 'sending' ? 'Odesílání...' : 'Odeslat zprávu')
                ),
                formMessage && e('p', { className: `text-center mt-4 ${status === 'success' ? 'text-brand-green' : 'text-red-500'}` }, formMessage)
            )
        )
    );
};


const Footer = () => {
  return e('footer', { className: "bg-white py-8 border-t border-gray-200" },
    e('div', { className: "container mx-auto px-6 text-brand-text/70 flex flex-wrap justify-center sm:justify-between items-center gap-x-6 gap-y-3 text-center sm:text-left" },
      e('p', null, `© ${new Date().getFullYear()} PureAloe. Všechna práva vyhrazena.`),
      e('div', { className: "flex items-center flex-wrap justify-center gap-x-6 gap-y-2" },
        e('a', { href: "#", className: "hover:text-brand-green hover:underline transition-colors duration-300" }, "Obchodní podmínky"),
        e('a', { href: "#", className: "hover:text-brand-green hover:underline transition-colors duration-300" }, "Ochrana osobních údajů"),
        e('a', { href: "#", "aria-label": "Sledujte nás na TikTok", className: "flex items-center text-current hover:text-brand-green hover:underline transition-colors duration-300" },
           e('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1.5", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" },
                e('path', { d: "M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" })
            ),
           e('span', null, "TikTok")
        )
      )
    )
  );
};

const CartSidebar = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return e(React.Fragment, null,
    e('div', { className: `fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-40`, onClick: onClose }),
    e('div', { className: `fixed top-0 right-0 h-full w-full max-w-md bg-brand-cream shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50` },
      e('div', { className: "flex flex-col h-full" },
        e('div', { className: "flex justify-between items-center p-6 border-b border-gray-200" },
          e('h2', { className: "text-2xl font-serif font-bold text-brand-green-dark" }, "Váš košík"),
          e('button', { onClick: onClose, className: "text-gray-400 hover:text-gray-800 text-4xl font-light", "aria-label": "Zavřít košík" }, "×")
        ),
        items.length === 0 ? (
          e('div', { className: "flex-grow flex items-center justify-center" }, e('p', { className: "text-gray-500" }, "Váš košík je prázdný."))
        ) : (
          e('div', { className: "flex-grow overflow-y-auto p-6 space-y-5" },
            items.map(item => e('div', { key: item.id, className: "flex items-center justify-between" },
              e('div', { className: "flex-grow" },
                e('h3', { className: "font-bold text-lg text-brand-text" }, item.name),
                e('p', { className: "text-gray-600" }, `${item.price} Kč`)
              ),
              e('div', { className: "flex items-center" },
                e('input', { type: "number", value: item.quantity, onChange: (ev) => onUpdateQuantity(item.id, parseInt(ev.target.value)), className: "w-16 text-center border border-gray-200 rounded-md mx-4 py-1", min: "1", "aria-label": `Množství pro ${item.name}` }),
                e('button', { onClick: () => onRemoveItem(item.id), className: "text-sm text-red-500 hover:text-red-700 hover:underline", "aria-label": `Odebrat ${item.name}` }, "Odebrat")
              )
            ))
          )
        ),
        items.length > 0 && e('div', { className: "p-6 border-t border-gray-200 bg-white" },
          e('div', { className: "flex justify-between font-bold text-lg mb-5" },
            e('span', { className: "text-brand-text" }, "Mezisoučet:"),
            e('span', { className: "text-brand-green-dark" }, `${subtotal} Kč`)
          ),
          e('button', { onClick: onCheckout, className: "w-full bg-brand-green text-white font-bold py-3 rounded-full hover:bg-brand-green-dark transition-all duration-300 shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform" }, "Přejít k pokladně")
        )
      )
    )
  );
};

const CheckoutPage = ({ onProcessPayment, onBackToStore, isLoading }) => {
  const [customer, setCustomer] = React.useState({ name: '', email: '' });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(customer).every(field => field.trim() !== '')) {
      onProcessPayment(customer);
    } else {
      alert('Prosím, vyplňte všechna pole.');
    }
  };
  
  return e('div', { className: "container mx-auto px-6 py-24" },
    e('h1', { className: "text-4xl lg:text-5xl font-serif font-bold text-center text-brand-green-dark mb-12" }, "Pokladna"),
    e('div', { className: "max-w-xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-soft-lg" },
      e('form', { id: "checkout-form", onSubmit: handleSubmit },
        e('h2', { className: "text-3xl font-serif font-bold mb-8 text-brand-green-dark" }, "Kontaktní údaje"),
        e('div', { className: "grid grid-cols-1 gap-6" },
          e('input', { name: "name", value: customer.name, onChange: handleInputChange, placeholder: "Celé jméno", className: "w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-shadow", required: true }),
          e('input', { name: "email", type: "email", value: customer.email, onChange: handleInputChange, placeholder: "E-mail", className: "w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-shadow", required: true })
        ),
        e('p', {className: "text-sm text-gray-500 mt-4"}, "Kompletní doručovací adresu zadáte v dalším kroku na zabezpečené platební bráně Stripe.")
      ),
      e('div', { className: "mt-10" },
        e('button', { 
            form: "checkout-form", 
            type: "submit", 
            disabled: isLoading,
            className: "w-full bg-brand-green text-white font-bold py-4 rounded-full hover:bg-brand-green-dark transition-all duration-300 shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform disabled:opacity-50 disabled:cursor-wait" 
        }, isLoading ? 'Zpracovávám...' : 'Přejít k platbě'),
        e('button', { onClick: onBackToStore, className: "w-full mt-4 text-brand-green hover:underline transition duration-300", disabled: isLoading }, "← Zpět do obchodu")
      )
    )
  );
};


const OrderSuccess = ({ onGoHome }) => e('div', { className: "container mx-auto px-6 py-24 text-center" }, e('div', { className: "max-w-lg mx-auto bg-white p-12 rounded-2xl shadow-soft-lg" }, e('h1', { className: "text-3xl font-serif font-bold text-brand-green-dark mb-4" }, "Děkujeme za objednávku!"), e('p', { className: "text-brand-text/80 mb-8" }, "Platba proběhla úspěšně. Potvrzení jsme vám zaslali na e-mail."), e('button', { onClick: onGoHome, className: "bg-brand-green text-white font-bold py-3 px-8 rounded-full hover:bg-brand-green-dark transition-all duration-300 shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform" }, "Zpět na hlavní stránku")));
const OrderCancel = ({ onGoHome }) => e('div', { className: "container mx-auto px-6 py-24 text-center" }, e('div', { className: "max-w-lg mx-auto bg-white p-12 rounded-2xl shadow-soft-lg" }, e('h1', { className: "text-3xl font-serif font-bold text-red-600 mb-4" }, "Platba byla zrušena"), e('p', { className: "text-brand-text/80 mb-8" }, "Vaše platba nebyla dokončena. Můžete se vrátit do obchodu a zkusit to znovu."), e('button', { onClick: onGoHome, className: "bg-brand-green text-white font-bold py-3 px-8 rounded-full hover:bg-brand-green-dark transition-all duration-300 shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform" }, "Zpět na hlavní stránku")));

// --- Hlavní komponenta App ---
const App = () => {
  const { useState, useEffect } = React;
  const initialProduct = { id: 'prod_SmBHENuJYsV52J', name: 'Aloe Vera Zklidňující Gel', price: 247, priceId: 'price_1RqculC4Cyuz0AUchCnJIx2H', averageRating: 4.8, reviewCount: 125 };
  const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Rpw4NC4Cyuz0AUc8x2J2b1k8Z2P2f5m1y2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O';

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState('store');
  const [stripe, setStripe] = useState(null);
  const [product] = useState(initialProduct);
  const [lastSessionId, setLastSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handlePaymentResult = async () => {
        const query = new URLSearchParams(window.location.search);
        const paymentStatus = query.get('payment');
        const sessionId = query.get('session_id');

        if (!sessionId || sessionId === lastSessionId) {
            return;
        }
        setLastSessionId(sessionId);

        if (paymentStatus === 'success') {
            try {
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
                setCartItems([]);
            }
        } else if (paymentStatus === 'cancel') {
            setView('cancel');
        }
        
        window.history.replaceState({}, '', window.location.pathname);
    };
    
    handlePaymentResult();
    
    if (window.Stripe) {
        setStripe(window.Stripe(STRIPE_PUBLISHABLE_KEY));
    } else {
        const stripeScript = document.getElementById('stripe-js');
        if (stripeScript) {
            stripeScript.addEventListener('load', () => {
                if (window.Stripe) setStripe(window.Stripe(STRIPE_PUBLISHABLE_KEY));
            });
        }
    }
  }, [lastSessionId]);

  const handleAddToCart = () => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(prevItems => prevItems.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
  };

  const handleGoHome = () => {
    setView('store');
  }

  const handleProcessPayment = async (customerDetails) => {
    if (!stripe) {
      alert('Platební brána se ještě načítá. Zkuste to prosím za okamžik.');
      return;
    }
    setIsLoading(true);

    try {
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
        throw new Error(data.message || 'Serveru se nepodařilo připravit platbu.');
      }
      
      const { sessionId } = data;

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
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
      case 'checkout': return e(CheckoutPage, { onProcessPayment: handleProcessPayment, onBackToStore: handleGoHome, isLoading: isLoading });
      case 'success': return e(OrderSuccess, { onGoHome: handleGoHome });
      case 'cancel': return e(OrderCancel, { onGoHome: handleGoHome });
      default: return e(React.Fragment, null,
          e(Hero, { onAddToCart: handleAddToCart }),
          e(Features),
          e(ProductShowcase, { product: product, onAddToCart: handleAddToCart }),
          e(CallToAction, { onAddToCart: handleAddToCart }),
          e(Reviews),
          e(ContactForm)
        );
    }
  };

  return e('div', { className: "bg-brand-cream min-h-screen font-sans text-brand-text" },
    e(Header, { cartCount: cartCount, onCartClick: () => setIsCartOpen(true) }),
    e('main', null, renderContent()),
    e(Footer),
    e(CartSidebar, { isOpen: isCartOpen, onClose: () => setIsCartOpen(false), items: cartItems, onUpdateQuantity: handleUpdateQuantity, onRemoveItem: handleRemoveFromCart, onCheckout: handleGoToCheckout })
  );
};

// --- Připojení App do DOM ---
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(e(React.StrictMode, null, e(App)));