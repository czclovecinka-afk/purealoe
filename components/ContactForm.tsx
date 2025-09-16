import React, { useState } from 'react';

const FORM_SUBMIT_URL = 'https://formspree.io/f/xovnznqd';

const ContactForm: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formMessage, setFormMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');
        setFormMessage('Odesílání...');

        const formData = new FormData(e.currentTarget);
        
        formData.append('_subject', `Nový dotaz z PureAloe od ${formData.get('name')}`);

        try {
            const response = await fetch(FORM_SUBMIT_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                setFormMessage('Zpráva byla úspěšně odeslána! Děkujeme.');
                if (e.currentTarget) { // Zde je oprava
                    e.currentTarget.reset();
                }
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

    return (
        <section id="contact" className="py-24 bg-brand-cream">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl font-serif font-bold text-brand-green-dark mb-4">Máte dotaz?</h2>
                    <p className="text-brand-text/80 mb-12">Neváhejte nás kontaktovat. Jsme tu pro vás.</p>
                </div>
                <form 
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-soft-lg"
                >
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-brand-text font-bold mb-2">Jméno</label>
                        <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-shadow" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-brand-text font-bold mb-2">E-mail</label>
                        <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-shadow" required />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="message" className="block text-brand-text font-bold mb-2">Zpráva</label>
                        <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-shadow" required></textarea>
                    </div>
                    <div className="text-center">
                        <button 
                            type="submit" 
                            disabled={status === 'sending'}
                            className="bg-brand-green text-white font-bold py-3 px-8 rounded-full hover:bg-brand-green-dark transition-all duration-300 shadow-soft-lg hover:shadow-lg hover:-translate-y-1 transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'sending' ? 'Odesílání...' : 'Odeslat zprávu'}
                        </button>
                    </div>
                    {formMessage && (
                        <p className={`text-center mt-4 ${status === 'success' ? 'text-brand-green' : 'text-red-500'}`}>
                            {formMessage}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default ContactForm;