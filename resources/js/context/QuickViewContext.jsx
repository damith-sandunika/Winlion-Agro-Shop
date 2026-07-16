import React, { createContext, useContext, useState } from 'react';
import { X, ShoppingCart, Check, Star } from 'lucide-react';
import { useCart } from './CartContext';

const QuickViewContext = createContext();

export const useQuickView = () => useContext(QuickViewContext);

export const QuickViewProvider = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const openQuickView = (product) => {
        setAdded(false);
        setSelectedProduct(product);
    };

    const closeQuickView = () => {
        setSelectedProduct(null);
        setTimeout(() => setAdded(false), 300);
    };

    const handleAddToCart = () => {
        if (selectedProduct) {
            addToCart(selectedProduct, 1);
            setAdded(true);
            setTimeout(() => {
                closeQuickView();
            }, 1000); // Close after 1 second showing success
        }
    };

    return (
        <QuickViewContext.Provider value={{ openQuickView, closeQuickView }}>
            {children}
            
            {/* Global Premium Quick View Modal */}
            {selectedProduct && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300"
                    onClick={closeQuickView}
                >
                    <div 
                        className="bg-white w-full max-w-3xl rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in zoom-in-95 fade-in duration-300 flex flex-col md:flex-row relative border border-white/20"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button 
                            onClick={closeQuickView} 
                            className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-md hover:bg-white text-gray-800 rounded-full shadow-lg transition-transform hover:scale-110 duration-300"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 relative bg-gray-50 h-[250px] md:h-auto overflow-hidden group">
                            {selectedProduct.oldPrice && (
                                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md transform -rotate-6">
                                    Special Offer
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                            <img 
                                src={selectedProduct.image} 
                                alt={selectedProduct.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        </div>
                        
                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white relative">
                            {/* Decorative blur */}
                            <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
                            
                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                                ))}
                                <span className="text-xs text-gray-400 ml-2">(120 Reviews)</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3 leading-tight tracking-tight">
                                {selectedProduct.name}
                            </h2>
                            
                            <p className="text-gray-500 text-sm md:text-base mb-6 leading-relaxed line-clamp-3">
                                {selectedProduct.description || "Fresh, high-quality agro product straight from the farm to your doorstep."}
                            </p>
                            
                            <div className="flex flex-col mb-8 p-4 bg-green-50/50 rounded-2xl border border-green-100">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Price per {selectedProduct.unit || 'kg'}</p>
                                <div className="flex items-end gap-4">
                                    <span className="text-4xl font-bold text-brand-green">
                                        <span className="text-lg mr-1">Rs</span>
                                        {Number(selectedProduct.price).toFixed(2)}
                                    </span>
                                    {selectedProduct.oldPrice && (
                                        <div className="flex flex-col pb-1">
                                            <span className="text-xs text-red-400 font-medium mb-0.5">Save Rs {(Number(selectedProduct.oldPrice) - Number(selectedProduct.price)).toFixed(2)}</span>
                                            <span className="text-lg text-gray-400 line-through">Rs {Number(selectedProduct.oldPrice).toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleAddToCart}
                                disabled={added}
                                className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_15px_rgba(21,128,61,0.2)] ${
                                    added 
                                    ? 'bg-green-500 text-white shadow-none transform scale-95' 
                                    : 'bg-brand-green hover:bg-brand-dark text-white hover:shadow-[0_8px_25px_rgba(21,128,61,0.3)] hover:-translate-y-1'
                                }`}
                            >
                                {added ? (
                                    <>
                                        <Check size={20} className="animate-in zoom-in" />
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={20} className="group-hover:-rotate-12 transition-transform" />
                                        Add to Cart Now
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </QuickViewContext.Provider>
    );
};
