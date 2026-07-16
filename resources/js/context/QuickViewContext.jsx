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
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={closeQuickView}
                >
                    <div 
                        className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-in zoom-in-95 fade-in duration-300 flex flex-col md:flex-row relative border border-gray-100"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button 
                            onClick={closeQuickView} 
                            className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-md hover:bg-white text-gray-800 rounded-full shadow-lg transition-transform hover:scale-110 duration-300"
                        >
                            <X size={20} />
                        </button>

                        <div className="w-full md:w-5/12 relative bg-gray-50/50 h-[200px] md:h-auto overflow-hidden group flex items-center justify-center p-4">
                            {selectedProduct.oldPrice && (
                                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                                    Special Offer
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                            <img 
                                src={selectedProduct.image} 
                                alt={selectedProduct.name} 
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out mix-blend-multiply"
                            />
                        </div>
                        
                        {/* Content Section */}
                        <div className="w-full md:w-7/12 p-5 md:p-7 flex flex-col justify-center bg-white relative">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:10px_10px] opacity-40"></div>

                            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 leading-tight relative z-10">
                                {selectedProduct.name}
                            </h2>
                            
                            {/* Decorative dashed line */}
                            <div className="w-12 border-b-2 border-dashed border-brand-green mb-3"></div>
                            
                            <p className="text-gray-500 text-[13px] md:text-sm mb-5 leading-relaxed line-clamp-2 md:line-clamp-3 relative z-10">
                                {selectedProduct.description || "Fresh, high-quality agro product straight from the farm to your doorstep."}
                            </p>
                            
                            <div className="flex flex-col mb-5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Price per {selectedProduct.unit || 'kg'}</p>
                                <div className="flex items-end gap-3">
                                    <span className="text-2xl md:text-3xl font-bold text-brand-green">
                                        <span className="text-sm md:text-base mr-1">Rs</span>
                                        {Number(selectedProduct.price).toFixed(2)}
                                    </span>
                                    {selectedProduct.oldPrice && (
                                        <div className="flex flex-col pb-0.5">
                                            <span className="text-[10px] text-red-500 font-medium mb-0.5">Save Rs {(Number(selectedProduct.oldPrice) - Number(selectedProduct.price)).toFixed(2)}</span>
                                            <span className="text-sm text-gray-400 line-through">Rs {Number(selectedProduct.oldPrice).toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleAddToCart}
                                disabled={added}
                                className={`w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm ${
                                    added 
                                    ? 'bg-green-500 text-white shadow-none transform scale-95' 
                                    : 'bg-brand-green hover:bg-brand-dark text-white hover:shadow-md hover:-translate-y-0.5'
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
