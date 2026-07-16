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

    useEffect(() => {
        axios.get('/api/public/categories')
            .then(res => {
                const fetched = res.data.map((cat) => ({
                    ...cat,
                    bgColor: 'bg-white',
                    image: cat.image ? `/storage/${cat.image}` : 'https://images.unsplash.com/photo-1599598425947-33001c40a5bc?auto=format&fit=crop&w=150&q=80'
                }));
                setCategories(fetched.slice(0, 8)); // Show top 8
            })
            .catch(err => console.error("Error loading categories", err));
    }, []);

    return (
        <section className="py-10 max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 tracking-tight">Shop By Categories</h3>
                <Link to="/categories" className="text-sm font-medium text-brand-green hover:text-brand-dark transition-colors flex items-center gap-1">
                    Explore All <span className="hidden sm:inline">Categories</span> &rarr;
                </Link>
            </div>
            
            <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-6 md:gap-6 mb-10">
                {categories.map((category) => (
                    <Link key={category.id} to={`/category/${category.id}`} className="group flex flex-col items-center">
                        <div className={`w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full ${category.bgColor || 'bg-gray-50'} flex items-center justify-center p-3 md:p-5 mb-3 shadow-[0_4px_15px_rgba(0,0,0,0.06)] border-2 border-white group-hover:bg-green-50 group-hover:shadow-[0_8px_25px_rgba(21,128,61,0.18)] transition-all duration-300 overflow-hidden mx-auto`}>
                            <img 
                                src={category.image} 
                                alt={category.name} 
                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                            />
                        </div>
                        <span className="text-[11px] md:text-sm font-medium text-gray-800 text-center leading-tight group-hover:text-brand-green px-1">{category.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
