import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const bgColors = [
    'bg-green-50', 'bg-orange-50', 'bg-yellow-50', 
    'bg-blue-50', 'bg-amber-50', 'bg-red-50', 
    'bg-purple-50', 'bg-pink-50'
];

const CategoryGrid = () => {
    const [categories, setCategories] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        axios.get('/api/public/categories')
            .then(res => {
                const fetched = res.data.map((cat) => ({
                    ...cat,
                    bgColor: 'bg-white',
                    image: cat.image ? `/storage/${cat.image}` : 'https://images.unsplash.com/photo-1599598425947-33001c40a5bc?auto=format&fit=crop&w=150&q=80'
                }));
                // Get up to 15 categories for the slider
                setCategories(fetched.slice(0, 15));
            })
            .catch(err => console.error("Error loading categories", err));
    }, []);

    const itemsPerSlide = isMobile ? 6 : 5; // 3x2 on mobile, 5x1 on desktop
    const totalSlides = Math.ceil(categories.length / itemsPerSlide) || 1;

    useEffect(() => {
        if (totalSlides <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % totalSlides);
        }, 3000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    // Group categories into slides
    const slides = [];
    for (let i = 0; i < totalSlides; i++) {
        slides.push(categories.slice(i * itemsPerSlide, (i + 1) * itemsPerSlide));
    }

    return (
        <section className="py-10 max-w-7xl mx-auto px-4 lg:px-6 overflow-hidden">
            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 tracking-tight">Shop By Categories</h3>
            </div>
            
            <div className="relative mb-6">
                <div 
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                            <div className={`grid gap-y-6 md:gap-6 ${isMobile ? 'grid-cols-3 grid-rows-2 gap-x-2' : 'grid-cols-5 gap-x-4'}`}>
                                {slide.map((category) => (
                                    <Link key={category.id} to={`/category/${category.id}`} className="group flex flex-col items-center">
                                        <div className={`w-[85px] h-[85px] md:w-[130px] md:h-[130px] rounded-full ${category.bgColor || 'bg-gray-50'} flex items-center justify-center p-3 md:p-5 mb-3 shadow-[0_4px_15px_rgba(0,0,0,0.06)] border-2 border-white group-hover:bg-green-50 group-hover:shadow-[0_8px_25px_rgba(21,128,61,0.18)] transition-all duration-300 overflow-hidden mx-auto`}>
                                            <img 
                                                src={category.image} 
                                                alt={category.name} 
                                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                                            />
                                        </div>
                                        <span className="text-[12px] md:text-sm font-medium text-gray-800 text-center leading-tight group-hover:text-brand-green px-1">{category.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            {totalSlides > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-6 bg-brand-green' : 'w-2 bg-gray-200 hover:bg-green-200'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default CategoryGrid;
