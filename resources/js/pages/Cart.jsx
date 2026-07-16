import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
    const { cartItems, updateQty, removeFromCart, cartTotal } = useCart();
    
    // Fallback values since setting may not be loaded directly here yet, but we will mock it for now.
    const delivery = cartTotal > 2000 ? 0 : 350;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
                <h1 className="text-2xl font-normal text-gray-800 mb-6">Shopping Cart</h1>
                
                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
                        <div className="text-lg mb-4">🛒</div>
                        <h2 className="text-xl font-normal text-gray-800 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Looks like you haven't added any fresh items yet.</p>
                        <Link to="/" className="inline-block px-8 py-3 rounded-xl text-white font-normal bg-brand-green hover:bg-brand-dark transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm relative">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mix-blend-multiply bg-gray-50 rounded-xl" />
                                    <div className="flex-1">
                                        <h3 className="font-normal text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Rs.{item.price} / {item.unit}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-gray-200 rounded-lg h-9 w-24 overflow-hidden">
                                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="flex-1 flex items-center justify-center hover:bg-gray-100"><Minus size={14} /></button>
                                            <span className="flex-1 flex items-center justify-center text-sm font-normal border-x border-gray-200">{item.quantity}</span>
                                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="flex-1 flex items-center justify-center hover:bg-gray-100 text-brand-green"><Plus size={14} /></button>
                                        </div>
                                        <p className="font-normal text-brand-green w-24 text-right">Rs.{item.price * item.quantity}</p>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-full lg:w-96">
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
                                <h3 className="font-normal text-gray-800 text-lg mb-4">Order Summary</h3>
                                <div className="space-y-3 text-sm text-gray-600 mb-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-normal text-gray-800">Rs.{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Fee</span>
                                        <span className="font-normal text-gray-800">{delivery === 0 ? 'Free' : `Rs.${delivery}`}</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-normal">
                                        <span className="text-gray-800">Total</span>
                                        <span className="text-brand-green">Rs.{(cartTotal + delivery).toLocaleString()}</span>
                                    </div>
                                </div>
                                <Link to="/checkout" className="block text-center w-full py-3 rounded-xl text-white font-normal transition-all shadow-lg shadow-green-300/50" style={{ background: 'linear-gradient(135deg, #298d24, #1b5e20)' }}>
                                    Proceed to Checkout
                                </Link>
                                {delivery > 0 && (
                                    <p className="text-center text-xs text-gray-500 mt-4">
                                        Add Rs.{(2000 - cartTotal).toLocaleString()} more for free delivery!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
