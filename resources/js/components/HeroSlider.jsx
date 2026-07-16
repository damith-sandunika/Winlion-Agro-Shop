import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Leaf, Sprout, Package, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const SlideContent = ({ slide, isActive }) => {
    return (
        <div className="max-w-2xl relative p-5 md:p-0 mx-4 md:mx-0">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-medium tracking-wider mb-4 md:mb-5 bg-[#e8eed2] text-[#2c531d] border border-[#a8c78c] transition-all duration-700 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Leaf size={12} className="md:w-3 md:h-3 fill-current" /> {slide.badge}
            </div>
            
            {/* Title */}
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 md:mb-5 text-[#1b5e20] whitespace-pre-line transition-all duration-700 delay-200 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {slide.title}
            </h2>

            {/* Subtitle */}
            <p className={`text-sm md:text-lg mb-6 md:mb-8 whitespace-pre-line font-medium leading-relaxed text-gray-800 md:text-[#2c4c26] max-w-lg transition-all duration-700 delay-400 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {slide.subtitle}
            </p>
            
            {/* Buttons */}
            <div className={`flex flex-row flex-wrap gap-3 md:gap-4 mb-4 md:mb-8 transition-all duration-700 delay-500 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <Link to="/shop" className="bg-[#1b5e20] hover:bg-[#14532d] text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1.5 text-[11px] md:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5">
                    {slide.button1} <ArrowRight size={14} className="md:w-4 md:h-4" />
                </Link>
                <Link to="/categories" className="bg-white/80 md:bg-transparent border border-[#1b5e20] text-[#1b5e20] hover:bg-[#1b5e20] hover:text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 text-[11px] md:text-sm text-center shadow-sm hover:shadow-lg hover:-translate-y-0.5">
                    {slide.button2}
                </Link>
            </div>

            {/* Features */}
            {slide.featuresLayout === 'inline' && (
                <div className={`flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 mt-6 md:mt-12 transition-all duration-700 delay-700 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    {slide.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <div className="text-[#1b5e20]">
                                <feature.icon size={24} className="md:w-6 md:h-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm md:text-[13px] text-gray-900 leading-none">{feature.title}</h4>
                                <p className="text-[13px] md:text-[11px] text-gray-600 font-medium mt-1">{feature.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const HeroSlider = () => {
    const slides = [
        {
            id: 1,
            badge: '100% PURE & NATURAL',
            title: 'Pure Goodness\nFrom Our Farms',
            subtitle: 'Carefully grown and handpicked agro products\n– straight from our farms to your home.',
            image: '/images/sliders/desktop slider (1).png',
            button1: 'Shop Now',
            button2: 'Explore Categories',
            featuresLayout: 'inline',
            features: [
                { icon: Leaf, title: '100% Natural', subtitle: '100% Natural' },
                { icon: Sprout, title: 'Direct from Farm', subtitle: 'Daily Harvest' },
                { icon: Truck, title: 'Fresh Delivery', subtitle: 'To Your Doorstep' }
            ]
        },
        {
            id: 2,
            badge: '100% PURE & NATURAL',
            title: 'Goodness Grown\nThe Natural Way',
            subtitle: 'From our fields to your family –\nfresh, healthy and trusted every day.',
            image: '/images/sliders/desktop slider (2).png',
            button1: 'Shop Now',
            button2: 'Explore Categories',
            featuresLayout: 'inline',
            features: [
                { icon: Leaf, title: '100% Natural', subtitle: 'Chemical Free' },
                { icon: Sprout, title: 'Farm Fresh', subtitle: 'Daily Harvest' },
                { icon: Truck, title: 'Fast Delivery', subtitle: 'To Your Doorstep' }
            ]
        },
        {
            id: 3,
            badge: '100% PURE & NATURAL',
            title: 'Nature\'s Goodness,\nGrown With Care',
            subtitle: 'From our tropical farms to your home –\nfresh, healthy and natural every time.',
            image: '/images/sliders/desktop slider (3).png',
            button1: 'Shop Now',
            button2: 'Explore Categories',
            featuresLayout: 'none',
            features: []
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto rotate
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full overflow-hidden border-b border-green-100/50">
            <div 
                className="flex transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] h-[450px] md:h-[500px] lg:h-[650px]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div 
                        key={slide.id} 
                        className={`w-full flex-shrink-0 relative`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0 flex justify-end">
                            <div className="w-full h-full relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 w-4/5 md:w-3/4"></div>
                                <img src={slide.image} alt="Slider Background" className="w-full h-full object-cover object-[75%_center] md:object-center transform scale-105" />
                            </div>
                        </div>

                        <div className="absolute inset-0 z-10 flex items-center justify-start">
                            <div className="container mx-auto px-4 md:px-12 lg:px-20 max-w-7xl w-full pt-10 md:pt-0">
                                <SlideContent slide={slide} isActive={currentSlide === index} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slider Controls */}
            <button 
                onClick={prevSlide}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-8 h-8 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:text-[#1b5e20] shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(21,128,61,0.2)] hover:-translate-x-1 transition-all z-30"
            >
                <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-8 h-8 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:text-[#1b5e20] shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(21,128,61,0.2)] hover:translate-x-1 transition-all z-30"
            >
                <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`rounded-full transition-all duration-500 ${currentSlide === index ? 'bg-[#1b5e20] w-6 h-1.5 md:w-10 md:h-2.5 shadow-md' : 'bg-gray-400/60 hover:bg-[#1b5e20]/50 w-1.5 h-1.5 md:w-2.5 md:h-2.5 backdrop-blur-sm'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
