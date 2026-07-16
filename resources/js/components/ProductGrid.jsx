import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductGrid = ({ title, products, showViewAll = true, icon = null }) => {
    return (
        <section className="py-10 max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex justify-between items-end mb-6">
                <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-normal text-gray-800">{title}</h3>
                    {icon && <span className="text-green-500">{icon}</span>}
                </div>
                {showViewAll && (
                    <Link to="/products" className="text-brand-green font-normal hover:underline text-sm hidden sm:block">View All Products &rarr;</Link>
                )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
