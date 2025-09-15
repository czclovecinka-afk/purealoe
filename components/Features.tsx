import React from 'react';

const FeatureIconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-brand-accent/50 rounded-full p-5 mb-6 inline-flex">
        {children}
    </div>
);

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0 1.172 1.953 1.172 5.119 0 7.072z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.32-6.002 9.003 9.003 0 00-16.64 0A9.004 9.004 0 0012 21z" />
    </svg>
);

const DropIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.702c-1.207 1.206-2.415 2.413-3.622 3.62-1.206 1.207-2.413 2.414-3.62 3.621-1.207 1.207-1.782 2.58-1.782 4.057 0 3.314 2.686 6 6 6s6-2.686 6-6c0-1.477-.575-2.85-1.782-4.057-1.207-1.207-2.414-2.414-3.62-3.621-1.207-1.207-2.415-2.414-3.622-3.62z" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.955a12.02 12.02 0 009 2.045 12.02 12.02 0 009-2.045c0-2.624-.508-5.116-1.382-7.371z" />
    </svg>
);

const Features: React.FC = () => {
    return (
        <section id="features" className="bg-white py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-serif font-bold text-brand-green-dark mb-16">Proč si zamilujete PureAloe</h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-16">
                    <div className="flex flex-col items-center max-w-xs">
                        <FeatureIconWrapper><LeafIcon /></FeatureIconWrapper>
                        <h3 className="text-2xl font-serif font-bold mb-4 text-brand-green-dark">100% Organické</h3>
                        <p className="text-brand-text/80">Pěstováno bez pesticidů a herbicidů pro maximální čistotu a účinnost.</p>
                    </div>
                    <div className="flex flex-col items-center max-w-xs">
                        <FeatureIconWrapper><DropIcon /></FeatureIconWrapper>
                        <h3 className="text-2xl font-serif font-bold mb-4 text-brand-green-dark">Hloubková Hydratace</h3>
                        <p className="text-brand-text/80">Okamžitě se vstřebává a zanechává pokožku svěží, hydratovanou a bez pocitu mastnoty.</p>
                    </div>
                    <div className="flex flex-col items-center max-w-xs">
                       <FeatureIconWrapper><ShieldCheckIcon /></FeatureIconWrapper>
                        <h3 className="text-2xl font-serif font-bold mb-4 text-brand-green-dark">Zklidnění a Regenerace</h3>
                        <p className="text-brand-text/80">Ideální pro zklidnění podrážděné pokožky po slunění, holení nebo bodnutí hmyzem.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;