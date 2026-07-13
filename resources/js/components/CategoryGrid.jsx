import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    { id: 1, name: 'Vegetables', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=150&q=80', bgColor: 'bg-green-50' },
    { id: 2, name: 'Fresh Fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=150&q=80', bgColor: 'bg-orange-50' },
    { id: 3, name: 'Seeds', image: 'https://images.unsplash.com/photo-1590483868623-df427e02cc7f?auto=format&fit=crop&w=150&q=80', bgColor: 'bg-yellow-50' },
    { id: 4, name: 'Plants & Saplings', image: 'https://images.unsplash.com/photo-1599598425947-33001c40a5bc?auto=format&fit=crop&w=150&q=80', bgColor: 'bg-green-50' },
    { id: 5, name: 'Fertilizer', image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=150&q=80', bgColor: 'bg-amber-50' },
    { id: 6, name: 'Organic Products', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80', bgColor: 'bg-green-100' },
    { id: 7, name: 'Animal Feed', image: 'https://images.unsplash.com/photo-1574345516709-3ce1a5e1564f?auto=format&fit=crop&w=150&q=80', bgColor: 'bg-gray-100' },
    { id: 8, name: 'Farming Tools', image: 'https://images.unsplash.com/photo-1416879598555-22728f322306?auto=format&fit=crop&w=150&q=80', bgColor: 'bg-blue-50' },
];

const CategoryGrid = () => {
    return (
        <section className="py-10 max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex justify-between items-end mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Shop By Categories</h3>
                <Link to="/categories" className="text-brand-green font-medium hover:underline text-sm hidden sm:block">View All Categories &rarr;</Link>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {categories.map((category) => (
                    <Link key={category.id} to={`/category/${category.id}`} className="group flex flex-col items-center">
                        <div className={`w-full aspect-square rounded-2xl ${category.bgColor} flex items-center justify-center p-4 mb-3 group-hover:shadow-md transition-all overflow-hidden border border-transparent group-hover:border-green-200`}>
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
        </section>
    );
};

export default CategoryGrid;
