import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Leaf, Sprout, Package, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
    // We'll use a static array for the slider items matching the design options
    const slides = [
        {
            id: 1,
            badge: '100% FRESH & NATURAL',
            title: 'Fresh From Farm\nTo Your Doorstep',
            subtitle: 'Premium quality agro products, fresh fruits, vegetables and more\n- delivered fresh to your home.',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
            bgColor: 'bg-gradient-to-br from-brand-light via-white to-brand-light',
            theme: 'light'
        },
        {
            id: 2,
            badge: 'EAT FRESH, STAY HEALTHY',
            title: 'Nature\'s Goodness\nDelivered Fresh',
            subtitle: 'Wide range of fresh fruits, vegetables, seeds, and more.\nQuality you can trust, service you can count on.',
            image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1200&q=80',
            bgColor: 'bg-gradient-to-br from-[#f0fdf4] via-[#ecfdf5] to-[#f0fdf4]',
            theme: 'light'
        },
        {
            id: 3,
            badge: 'PREMIUM QUALITY',
            title: 'Healthy Food\nHealthy Life',
            subtitle: 'Your one-stop shop for all agro needs.\nFresh. Natural. Reliable.',
            image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
            bgColor: 'bg-gradient-to-br from-brand-dark via-[#064e3b] to-brand-dark',
            theme: 'dark'
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full overflow-hidden border-b border-green-100/50">
            <div 
                className="flex transition-transform duration-700 ease-out h-[500px] lg:h-[600px]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div 
                        key={slide.id} 
                        className={`w-full flex-shrink-0 relative ${slide.bgColor}`}
                    >
                        {/* Background Image Setup (using absolute positioning to blend well) */}
                        <div className="absolute inset-0 z-0 flex justify-end">
                             <div className="w-full md:w-3/5 h-full relative">
                                <div className={`absolute inset-0 bg-gradient-to-r ${slide.theme === 'dark' ? 'from-brand-dark via-brand-dark/80' : 'from-brand-light via-brand-light/80'} to-transparent z-10 md:hidden`}></div>
                                <div className={`absolute inset-0 bg-gradient-to-r ${slide.theme === 'dark' ? 'from-brand-dark via-brand-dark/80' : slide.id === 2 ? 'from-[#f0fdf4] via-[#f0fdf4]/80' : 'from-brand-light via-brand-light/80'} to-transparent z-10 hidden md:block`}></div>
                                <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent z-10 mix-blend-overlay"></div>
                                <img src={slide.image} alt="Farm Fresh" className="w-full h-full object-cover" />
                             </div>
                        </div>

                        <div className="absolute inset-0 z-10 flex items-center">
                            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl w-full">
                                <div className="max-w-xl">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-normal tracking-wider mb-6 uppercase ${slide.theme === 'dark' ? 'bg-white/10 text-green-300' : 'bg-brand-green/10 text-brand-green'} backdrop-blur-sm border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                                        <Leaf size={14} /> {slide.badge}
                                    </div>
                                    <h2 className={`text-xl md:text-2xl lg:text-xl font-normal tracking-tight leading-[1.1] mb-6 ${slide.theme === 'dark' ? 'text-white' : 'text-gray-900'} whitespace-pre-line animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100`}>
                                        {slide.title}
                                    </h2>
                                    <p className={`text-lg lg:text-xl mb-8 whitespace-pre-line font-light leading-relaxed ${slide.theme === 'dark' ? 'text-gray-200' : 'text-gray-600'} animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200`}>
                                        {slide.subtitle}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <Link to="/shop" className="bg-brand-green hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-normal transition-all duration-300 flex items-center gap-2 shadow-[0_8px_20px_rgba(21,128,61,0.3)] hover:shadow-[0_8px_25px_rgba(21,128,61,0.4)] hover:-translate-y-1">
                                            Shop Now <ArrowRight size={20} />
                                        </Link>
                                    </div>

                                    {/* Features specific to slider 1 & 2 layout */}
                                    {slide.theme !== 'dark' && (
                                        <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-gray-200/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-green border border-green-50 group-hover:scale-110 transition-transform">
                                                    <Sprout size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-normal text-sm text-gray-900 leading-tight">Farm Fresh</h4>
                                                    <p className="text-xs text-gray-500 font-normal mt-0.5">Direct from Farmers</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 group">
                                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-green border border-green-50 group-hover:scale-110 transition-transform">
                                                    <Package size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-normal text-sm text-gray-900 leading-tight">Safe Packaging</h4>
                                                    <p className="text-xs text-gray-500 font-normal mt-0.5">Hygienic & Secure</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 hidden sm:flex group">
                                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-green border border-green-50 group-hover:scale-110 transition-transform">
                                                    <Truck size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-normal text-sm text-gray-900 leading-tight">Fast Delivery</h4>
                                                    <p className="text-xs text-gray-500 font-normal mt-0.5">On Time Delivery</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slider Controls */}
            <button 
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-brand-green hover:shadow-lg transition-all z-20 shadow-sm border border-white/20 opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
                <ChevronLeft size={24} />
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-brand-green hover:shadow-lg transition-all z-20 shadow-sm border border-white/20 opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-brand-green w-8 h-2.5 shadow-sm' : 'bg-gray-400/50 hover:bg-gray-400 w-2.5 h-2.5 backdrop-blur-sm'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
