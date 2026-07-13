import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
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
            bgColor: 'bg-gradient-to-r from-brand-light to-white',
        },
        {
            id: 2,
            badge: 'EAT FRESH, STAY HEALTHY',
            title: 'Nature\'s Goodness\nDelivered Fresh',
            subtitle: 'Wide range of fresh fruits, vegetables, seeds, and more.\nQuality you can trust, service you can count on.',
            image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1200&q=80',
            bgColor: 'bg-gradient-to-r from-green-50 to-brand-light',
        },
        {
            id: 3,
            badge: 'PREMIUM QUALITY',
            title: 'Healthy Food\nHealthy Life',
            subtitle: 'Your one-stop shop for all agro needs.\nFresh. Natural. Reliable.',
            image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
            bgColor: 'bg-brand-dark text-white',
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
        <div className="relative w-full overflow-hidden rounded-xl my-4">
            <div 
                className="flex transition-transform duration-500 ease-in-out h-[400px] lg:h-[500px]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div 
                        key={slide.id} 
                        className={`w-full flex-shrink-0 relative ${slide.bgColor}`}
                    >
                        {/* Background Image Setup (using absolute positioning to blend well) */}
                        <div className="absolute inset-0 z-0 flex justify-end">
                             <div className="w-1/2 md:w-3/5 h-full relative">
                                <div className={`absolute inset-0 bg-gradient-to-r ${slide.id === 3 ? 'from-brand-dark' : slide.id === 2 ? 'from-green-50' : 'from-brand-light'} to-transparent z-10`} style={{ background: `linear-gradient(to right, ${slide.id === 3 ? '#1b5e20' : slide.id === 2 ? '#f0fdf4' : '#eef8f0'} 0%, transparent 100%)` }}></div>
                                <img src={slide.image} alt="Farm Fresh" className="w-full h-full object-cover" />
                             </div>
                        </div>

                        <div className="absolute inset-0 z-10 flex items-center">
                            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl w-full">
                                <div className="max-w-xl">
                                    <span className={`inline-block font-bold text-sm tracking-wider mb-4 uppercase ${slide.id === 3 ? 'text-green-300' : 'text-brand-green'}`}>
                                        <span className="mr-2">🌱</span> {slide.badge}
                                    </span>
                                    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 ${slide.id === 3 ? 'text-white' : 'text-gray-900'} whitespace-pre-line`}>
                                        {slide.title}
                                    </h2>
                                    <p className={`text-lg mb-8 whitespace-pre-line ${slide.id === 3 ? 'text-gray-200' : 'text-gray-600'}`}>
                                        {slide.subtitle}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <Link to="/shop" className="bg-brand-green hover:bg-brand-dark text-white px-8 py-3.5 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-green-200">
                                            Shop Now <ArrowRight size={20} />
                                        </Link>
                                        <Link to="/categories" className={`px-8 py-3.5 rounded-lg font-semibold transition-colors border-2 ${slide.id === 3 ? 'border-white text-white hover:bg-white hover:text-brand-dark' : 'border-gray-200 text-gray-700 bg-white hover:border-brand-green hover:text-brand-green'}`}>
                                            Explore Categories
                                        </Link>
                                    </div>

                                    {/* Features specific to slider 1 & 2 layout */}
                                    {slide.id !== 3 && (
                                        <div className="flex gap-6 mt-10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-green">
                                                    🌿
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-gray-800 leading-tight">Farm Fresh</h4>
                                                    <p className="text-xs text-gray-500">Direct from Farmers</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-green">
                                                    📦
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-gray-800 leading-tight">Safe Packaging</h4>
                                                    <p className="text-xs text-gray-500">Hygienic & Secure</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 hidden sm:flex">
                                                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-green">
                                                    🚚
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-gray-800 leading-tight">Fast Delivery</h4>
                                                    <p className="text-xs text-gray-500">On Time Delivery</p>
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
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-brand-green hover:shadow-md transition-all z-20 shadow-sm"
            >
                <ChevronLeft size={24} />
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-brand-green hover:shadow-md transition-all z-20 shadow-sm"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === index ? 'bg-brand-green w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
