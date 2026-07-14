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
            <div className="flex justify-between items-end mb-8">
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shop By Categories</h3>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
                {categories.map((category) => (
                    <Link key={category.id} to={`/category/${category.id}`} className="group flex flex-col items-center">
                        <div className={`w-full aspect-square rounded-2xl ${category.bgColor} flex items-center justify-center p-4 mb-3 group-hover:shadow-md transition-all overflow-hidden border border-gray-100 group-hover:border-green-200`}>
                            <img 
                                src={category.image} 
                                alt={category.name} 
                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" 
                            />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 text-center leading-tight group-hover:text-brand-green">{category.name}</span>
                    </Link>
                ))}
            </div>

            <div className="flex justify-center">
                <Link to="/categories" className="px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 border-2 border-gray-200 text-gray-700 bg-white hover:border-brand-green hover:text-brand-green hover:shadow-lg hover:-translate-y-0.5">
                    Explore All Categories &rarr;
                </Link>
            </div>
        </section>
    );
};

export default CategoryGrid;
