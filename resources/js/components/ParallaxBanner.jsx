import React from 'react';
import { Link } from 'react-router-dom';

const ParallaxBanner = () => {
    return (
        <section 
            className="relative py-24 md:py-32 bg-fixed bg-center bg-cover flex items-center justify-center"
            style={{ backgroundImage: "url('/images/sliders/desktop slider (3).png')" }}
        >
            {/* Flat black overlay instead of gradient */}
            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-4 drop-shadow-lg">
                    Discover Nature's Best
                </h3>
                <p className="text-gray-100 text-base md:text-xl max-w-2xl mx-auto mb-8 font-light drop-shadow-md">
                    Explore our wide variety of farm-fresh products, handpicked and delivered straight to your doorstep with guaranteed freshness.
                </p>
                <Link 
                    to="/shop" 
                    className="inline-block bg-brand-green hover:bg-brand-dark text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full font-medium transition-all duration-300 shadow-[0_4px_15px_rgba(21,128,61,0.3)] hover:shadow-[0_8px_25px_rgba(21,128,61,0.4)] hover:-translate-y-1"
                >
                    Explore Shop
                </Link>
            </div>
        </section>
    );
};

export default ParallaxBanner;
