import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useQuickView } from '../context/QuickViewContext';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();
    const { openQuickView } = useQuickView();

    const increase = () => setQuantity(q => q + 1);
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative group flex flex-col h-full z-10 hover:z-20">
            {/* Discount Badge */}
            {product.discount > 0 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-[11px] font-normal px-2.5 py-1 rounded-full z-10 shadow-sm shadow-red-200">
                    -{product.discount}%
                </div>
            )}
            
            {/* Wishlist Button Removed as requested */}

            {/* Image */}
            <div 
                onClick={() => openQuickView(product)} 
                className="block relative aspect-square mb-4 overflow-hidden rounded-xl bg-white flex-shrink-0 transition-colors cursor-pointer"
            >
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-2.5 md:p-4 group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-1">
                <div onClick={() => openQuickView(product)} className="cursor-pointer">
                    <h4 className="font-normal text-gray-800 text-base mb-1 group-hover:text-brand-green transition-colors line-clamp-1">{product.name}</h4>
                </div>
                
                {/* Decorative Line instead of rating */}
                <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-brand-green to-transparent rounded-full mb-3 mt-1 opacity-70"></div>

                {/* Price */}
                <div className="flex flex-col mb-4 mt-auto">
                    {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through mb-0.5">Rs.{product.oldPrice}</span>
                    )}
                    <div className="flex items-end gap-1">
                        <span className="font-normal text-xl text-brand-green">Rs.{product.price}</span>
                        <span className="text-xs text-gray-500 mb-1">/{product.unit}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-1 md:gap-2 mt-auto w-full">
                    <div className="flex items-center border border-gray-200 rounded-md md:rounded-lg overflow-hidden h-8 md:h-10 w-20 md:w-24 flex-shrink bg-gray-50">
                        <button onClick={decrease} className="w-6 md:w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors text-xs md:text-base">-</button>
                        <input type="text" value={quantity} readOnly className="flex-1 h-full text-center text-xs md:text-sm font-normal bg-transparent p-0 w-full focus:outline-none" />
                        <button onClick={increase} className="w-6 md:w-8 h-full flex items-center justify-center text-brand-green hover:bg-gray-200 hover:text-brand-dark font-normal transition-colors text-xs md:text-base">+</button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        title="Add to Cart"
                        className={`flex-1 max-w-[48px] min-w-[32px] md:w-12 text-white font-normal rounded-md md:rounded-lg h-8 md:h-10 transition-all duration-300 flex items-center justify-center shadow-sm ${
                            added ? 'bg-green-500' : 'bg-brand-green hover:bg-brand-dark hover:shadow-md hover:-translate-y-0.5'
                        }`}
                    >
                        {added ? <Check size={16} className="md:w-5 md:h-5" /> : <ShoppingCart size={16} className="md:w-5 md:h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
