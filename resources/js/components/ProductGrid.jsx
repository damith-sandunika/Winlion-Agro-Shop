import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ChevronDown } from 'lucide-react';

const ProductGrid = ({ title, products, showViewAll = true, icon = null, enableShowMore = false }) => {
    const [visibleCount, setVisibleCount] = useState(enableShowMore ? 6 : products.length);

    useEffect(() => {
        if (!enableShowMore) {
            setVisibleCount(products.length);
        }
    }, [products.length, enableShowMore]);

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    const visibleProducts = products.slice(0, visibleCount);
    const hasMore = visibleCount < products.length;

    return (
        <section className="py-10 max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                    <h3 className="text-xl md:text-2xl font-medium text-gray-900 tracking-tight">{title}</h3>
                    {icon && <span className="text-brand-green">{icon}</span>}
                </div>
                {showViewAll && (
                    <Link to="/products" className="text-sm font-medium text-brand-green hover:text-brand-dark transition-colors flex items-center gap-1 hidden sm:flex">
                        View All Products &rarr;
                    </Link>
                )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 mb-8">
                {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {enableShowMore && hasMore && (
                <div className="flex justify-center mt-4">
                    <button 
                        onClick={handleShowMore}
                        className="flex items-center gap-2 px-8 py-3 bg-green-50 text-brand-green hover:bg-brand-green hover:text-white rounded-full font-medium transition-all duration-300 shadow-[0_2px_10px_rgba(21,128,61,0.1)] hover:shadow-[0_8px_25px_rgba(21,128,61,0.2)] hover:-translate-y-1"
                    >
                        Show More <ChevronDown size={18} />
                    </button>
                </div>
            )}
        </section>
    );
};

export default ProductGrid;
