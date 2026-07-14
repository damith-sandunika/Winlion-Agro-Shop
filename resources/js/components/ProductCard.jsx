import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

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
                <div className="absolute top-3 right-3 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-10 shadow-sm shadow-red-200">
                    -{product.discount}%
                </div>
            )}
            
            {/* Wishlist Button Removed as requested */}

            {/* Image */}
            <Link to={`/product/${product.id}`} className="block relative aspect-square mb-4 overflow-hidden rounded-xl bg-white flex-shrink-0 transition-colors">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply"
                />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 px-1">
                <Link to={`/product/${product.id}`}>
                    <h4 className="font-semibold text-gray-800 text-base mb-1 group-hover:text-brand-green transition-colors line-clamp-1">{product.name}</h4>
                </Link>
                
                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex text-amber-400">
                        {[1,2,3,4,5].map(star => (
                            <Star key={star} size={14} className="fill-current" />
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
                </div>

                {/* Price */}
                <div className="flex flex-col mb-4 mt-auto">
                    {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through mb-0.5">Rs.{product.oldPrice}</span>
                    )}
                    <div className="flex items-end gap-1">
                        <span className="font-bold text-xl text-brand-green">Rs.{product.price}</span>
                        <span className="text-xs text-gray-500 mb-1">/{product.unit}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-10 w-24 flex-shrink-0 bg-gray-50">
                        <button onClick={decrease} className="flex-1 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors">-</button>
                        <input type="text" value={quantity} readOnly className="w-8 h-full text-center text-sm font-semibold bg-transparent" />
                        <button onClick={increase} className="flex-1 h-full flex items-center justify-center text-brand-green hover:bg-gray-200 hover:text-brand-dark font-medium transition-colors">+</button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        title="Add to Cart"
                        className={`w-12 flex-shrink-0 text-white font-medium rounded-lg h-10 transition-all duration-300 flex items-center justify-center shadow-sm ${
                            added ? 'bg-green-500' : 'bg-brand-green hover:bg-brand-dark hover:shadow-md hover:-translate-y-0.5'
                        }`}
                    >
                        {added ? <Check size={20} /> : <ShoppingCart size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
