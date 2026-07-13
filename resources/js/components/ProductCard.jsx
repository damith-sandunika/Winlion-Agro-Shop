import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const { addToCart, toggleWishlist, isWishlisted } = useCart();

    const increase = () => setQuantity(q => q + 1);
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg transition-shadow relative group flex flex-col h-full">
            {/* Discount Badge */}
            {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
                    {product.discount}% OFF
                </div>
            )}
            
            {/* Wishlist Button */}
            <button onClick={() => toggleWishlist(product)} className="absolute top-4 right-4 z-10 transition-colors">
                <Heart size={20} className={isWishlisted(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-300 hover:text-red-400'} />
            </button>

            {/* Image */}
            <Link to={`/product/${product.id}`} className="block relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50 flex-shrink-0">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1">
                <Link to={`/product/${product.id}`}>
                    <h4 className="font-bold text-gray-800 text-sm mb-1 hover:text-brand-green line-clamp-1">{product.name}</h4>
                </Link>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(star => (
                            <Star key={star} size={12} className="fill-current" />
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-2 mb-4 mt-auto">
                    <span className="font-bold text-lg text-brand-green">Rs.{product.price}</span>
                    <span className="text-xs text-gray-500 mb-1">/{product.unit}</span>
                    {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through mb-0.5 ml-1">Rs.{product.oldPrice}</span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-9">
                        <button onClick={decrease} className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">-</button>
                        <input type="text" value={quantity} readOnly className="w-8 h-full text-center text-sm font-medium border-x border-gray-200 bg-white" />
                        <button onClick={increase} className="w-8 h-full flex items-center justify-center text-brand-green font-bold hover:bg-gray-100 transition-colors">+</button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className={`flex-1 text-white font-medium text-sm rounded-lg h-9 transition-all flex items-center justify-center gap-1.5 ${
                            added ? 'bg-green-500' : 'bg-brand-green hover:bg-brand-dark'
                        }`}
                    >
                        {added ? <><Check size={14} /> Added!</> : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
