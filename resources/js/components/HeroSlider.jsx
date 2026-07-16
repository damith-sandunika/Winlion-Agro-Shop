import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Leaf, Sprout, Package, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const TypewriterText = ({ text, isActive, speed = 40, delay = 0, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!isActive) {
            setDisplayedText('');
            return;
        }

        let timeoutId;
        let currentIndex = 0;

        const startTyping = () => {
            const intervalId = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(intervalId);
                    if (onComplete) onComplete();
                }
            }, speed);

            return () => clearInterval(intervalId);
        };

        timeoutId = setTimeout(() => {
            const cleanup = startTyping();
            return cleanup;
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [text, isActive, speed, delay]);

    return <span>{displayedText}</span>;
};

const SlideContent = ({ slide, isActive }) => {
    const [titleDone, setTitleDone] = useState(false);
    const [subDone, setSubDone] = useState(false);

    useEffect(() => {
        if (!isActive) {
            setTitleDone(false);
            setSubDone(false);
        }
    }, [isActive]);

    return (
        <div className="max-w-2xl relative pt-0 pb-0 md:pt-0 md:pb-0">
            {/* Badge appears first instantly if active */}
            <div className={`inline-flex items-center gap-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[9px] md:text-[11px] font-medium tracking-wider mb-4 md:mb-5 bg-[#e8eed2] text-[#2c531d] border border-[#a8c78c] transition-opacity duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Leaf size={10} className="md:w-3 md:h-3 fill-current" /> {slide.badge}
            </div>
            
            {/* Title with typewriter */}
            <h2 className="text-[28px] leading-[1.2] md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 md:mb-5 text-[#1a3a14] whitespace-pre-line md:min-h-[140px]">
                <TypewriterText 
                    text={slide.title} 
                    isActive={isActive} 
                    delay={300} 
                    onComplete={() => setTitleDone(true)} 
                />
                {!titleDone && isActive && <span className="animate-pulse">|</span>}
            </h2>

            {/* Subtitle with typewriter */}
            <p className="text-[12px] md:text-lg mb-6 md:mb-8 whitespace-pre-line font-medium leading-relaxed text-[#3a5a34] max-w-lg pr-4 md:pr-0 md:min-h-[60px]">
                {titleDone && (
                    <TypewriterText 
                        text={slide.subtitle} 
                        isActive={isActive} 
                        speed={20}
                        onComplete={() => setSubDone(true)} 
                    />
                )}
            </p>
            
            {/* Buttons appear after subtitle */}
            <div className={`flex flex-row flex-wrap gap-3 md:gap-4 mb-6 md:mb-8 transition-all duration-700 justify-start ${subDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Link to="/shop" className="bg-[#1b5e20] hover:bg-[#14532d] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-1.5 text-[10px] md:text-sm shadow-md">
                    {slide.button1} <ArrowRight size={12} className="md:w-4 md:h-4" />
                </Link>
                <Link to="/categories" className="bg-transparent border border-[#1b5e20] text-[#1b5e20] hover:bg-[#1b5e20] hover:text-white px-3 py-1.5 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 text-[10px] md:text-sm text-center">
                    {slide.button2}
                </Link>
            </div>

            {/* Features appear after buttons */}
            {slide.featuresLayout === 'inline' && (
                <div className={`flex flex-row flex-wrap gap-4 md:gap-6 mt-4 md:mt-12 transition-all duration-700 delay-300 ${subDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {slide.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 md:gap-3">
                            <div className="text-[#1b5e20]">
                                <feature.icon size={16} className="md:w-6 md:h-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="font-medium text-[10px] md:text-[13px] text-gray-900 leading-none">{feature.title}</h4>
                                <p className="text-[9px] md:text-[11px] text-gray-600 font-normal mt-1">{feature.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const HeroSlider = () => {
    // We'll use a static array for the slider items matching the design options
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
        }, 8000); // 8 seconds to allow reading after typing
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
                className="flex transition-transform duration-700 ease-out h-[420px] md:h-[500px] lg:h-[600px]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div 
                        key={slide.id} 
                        className={`w-full flex-shrink-0 relative ${slide.bgColor}`}
                    >
                        {/* Background Image - With strong white gradient for text readability */}
                        <div className="absolute inset-0 z-0 flex justify-end">
                            <div className="w-full h-full relative">
                                {/* Desktop white gradient on left */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent z-10 hidden md:block w-3/4"></div>
                                {/* Mobile white overlay gradient - softer */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent z-10 md:hidden"></div>
                                <img src={slide.image} alt="Slider Background" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="absolute inset-0 z-10 flex items-center">
                            <div className="container mx-auto px-10 md:px-12 lg:px-20 max-w-7xl w-full">
                                <SlideContent slide={slide} isActive={currentSlide === index} />
                            </div>
                        </div>

                        {/* Slide 3 Floating Bar layout */}
                        {slide.featuresLayout === 'floating-bar' && (
                            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 px-4">
                                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-between py-4 px-8 max-w-5xl w-full mx-auto divide-x divide-gray-100 overflow-x-auto">
                                    {slide.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 px-6 first:pl-0 last:pr-0 min-w-max">
                                            <div className="text-[#1b5e20]">
                                                <feature.icon size={28} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-sm text-gray-900 leading-none">{feature.title}</h4>
                                                <p className="text-xs text-gray-500 font-normal mt-1">{feature.subtitle}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Slider Controls */}
            <button 
                onClick={prevSlide}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-[#1b5e20] shadow-md hover:shadow-lg transition-all z-30"
            >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-[#1b5e20] shadow-md hover:shadow-lg transition-all z-30"
            >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
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
