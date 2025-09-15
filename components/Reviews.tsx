import React from 'react';

const StarIcon = ({ className }: { className: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);

const ReviewCard = ({ name, text, stars, imgSrc }: { name: string, text: string, stars: number, imgSrc: string }) => (
    <div className="bg-white p-8 rounded-2xl shadow-soft max-w-sm mx-auto h-full flex flex-col transition-transform duration-300 hover:-translate-y-2">
        <div className="flex items-center mb-5">
            <img className="w-14 h-14 rounded-full mr-5 object-cover" src={imgSrc} alt={`Profilová fotka ${name}`} />
            <div>
                <h4 className="text-xl font-bold text-brand-green-dark">{name}</h4>
                <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-5 h-5 ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                </div>
            </div>
        </div>
        <p className="text-brand-text/80 italic">"{text}"</p>
    </div>
);

const Reviews: React.FC = () => {
    const reviews = [
        { name: "Jana N.", text: "Tento gel je zázrak! Moje pleť nebyla nikdy tak hydratovaná a zklidněná. Používám ho každý den.", stars: 5, imgSrc: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2" },
        { name: "Petr S.", text: "Perfektní po opalování. Okamžitě chladí a zabraňuje loupání kůže. V létě nezbytnost.", stars: 5, imgSrc: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2" },
        { name: "Eva K.", text: "Konečně něco, co pomohlo na mou citlivou pleť. Žádné podráždění, jen příjemný pocit. Doporučuji!", stars: 5, imgSrc: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2" },
    ];

    return (
        <section id="reviews" className="py-24 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-serif font-bold text-brand-green-dark mb-16">Co říkají naši zákazníci</h2>
                <div className="grid md:grid-cols-3 gap-10">
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} {...review} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;