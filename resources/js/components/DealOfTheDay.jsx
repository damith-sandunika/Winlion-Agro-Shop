import React, { useState, useEffect } from 'react';
import { Clock, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DealOfTheDay = () => {
    // Basic countdown logic
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        minutes: 45,
        seconds: 30
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                        else {
                            hours = 23;
                            if (days > 0) days--;
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 lg:px-6">
            <div className="bg-brand-light/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-brand-green/20 flex flex-col lg:flex-row items-center gap-10 lg:gap-20 overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-brand-green/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
                
                {/* Product Image */}
                <div className="w-full lg:w-1/2 relative z-10 flex justify-center">
                    <div className="relative group">
                        {/* Discount Badge */}
                        <div className="absolute top-4 left-4 z-20 bg-red-500 text-white font-bold text-lg md:text-xl rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                            -30%
                        </div>
                        <div className="w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full bg-white shadow-2xl overflow-hidden border-8 border-white group-hover:shadow-[0_20px_50px_rgba(21,128,61,0.2)] transition-all duration-500 relative">
                            <img 
                                src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80" 
                                alt="Fresh Organic Bananas" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left">
                    <span className="inline-block text-brand-green font-medium tracking-widest uppercase mb-3 text-sm md:text-base">Hurry Up! Deal of the Day</span>
                    <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight tracking-tight">Premium Organic Cavendish Bananas</h2>
                    
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                        <span className="text-3xl md:text-4xl font-bold text-brand-green">Rs 450.00</span>
                        <span className="text-xl md:text-2xl text-gray-400 line-through">Rs 650.00</span>
                    </div>
                    
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 text-sm md:text-base leading-relaxed">
                        Enjoy the sweet, creamy taste of our 100% organic, hand-picked Cavendish bananas. Packed with nutrients and perfect for a healthy snack or baking!
                    </p>

                    {/* Timer */}
                    <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 mb-10">
                        <div className="flex flex-col items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl w-16 h-16 md:w-20 md:h-20">
                            <span className="text-xl md:text-2xl font-bold text-gray-900">{String(timeLeft.days).padStart(2, '0')}</span>
                            <span className="text-[10px] md:text-xs text-gray-500 uppercase font-medium">Days</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-300">:</span>
                        <div className="flex flex-col items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl w-16 h-16 md:w-20 md:h-20">
                            <span className="text-xl md:text-2xl font-bold text-gray-900">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="text-[10px] md:text-xs text-gray-500 uppercase font-medium">Hours</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-300">:</span>
                        <div className="flex flex-col items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl w-16 h-16 md:w-20 md:h-20">
                            <span className="text-xl md:text-2xl font-bold text-gray-900">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="text-[10px] md:text-xs text-gray-500 uppercase font-medium">Mins</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-300">:</span>
                        <div className="flex flex-col items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl w-16 h-16 md:w-20 md:h-20">
                            <span className="text-xl md:text-2xl font-bold text-brand-green animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="text-[10px] md:text-xs text-gray-500 uppercase font-medium">Secs</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <button className="w-full sm:w-auto bg-brand-green hover:bg-brand-dark text-white px-8 py-3.5 md:py-4 rounded-xl font-medium transition-all duration-300 shadow-[0_4px_15px_rgba(21,128,61,0.2)] hover:shadow-[0_8px_25px_rgba(21,128,61,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2 group">
                            <ShoppingCart size={20} className="group-hover:-rotate-12 transition-transform" />
                            Add to Cart
                        </button>
                        <Link to="/products" className="w-full sm:w-auto bg-white border-2 border-gray-200 text-gray-700 hover:border-brand-green hover:text-brand-green px-8 py-3.5 md:py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group">
                            View More Deals
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealOfTheDay;
