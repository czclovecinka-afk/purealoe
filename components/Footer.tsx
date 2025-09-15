import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-6 text-brand-text/70 flex flex-wrap justify-center sm:justify-between items-center gap-x-6 gap-y-3 text-center sm:text-left">
        <p>&copy; {new Date().getFullYear()} PureAloe. Všechna práva vyhrazena.</p>
        <div className="flex items-center flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="#" className="hover:text-brand-green hover:underline transition-colors duration-300">Obchodní podmínky</a>
          <a href="#" className="hover:text-brand-green hover:underline transition-colors duration-300">Ochrana osobních údajů</a>
          {/* TikTok Icon with Text */}
          <a href="#" aria-label="Sledujte nás na TikTok" className="flex items-center text-current hover:text-brand-green hover:underline transition-colors duration-300">
             <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1.5"
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z"></path>
            </svg>
            <span>TikTok</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;