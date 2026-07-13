import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
    const { cartItems, cartTotal } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', payment_method: 'COD' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const delivery = cartTotal > 2000 ? 0 : 350;
    const grandTotal = cartTotal + delivery;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;
        setLoading(true);
        setError('');
        
        try {
            await axios.get('/sanctum/csrf-cookie');
            const res = await axios.post('/api/public/orders', {
                customer_name: form.name,
                whatsapp_number: form.phone,
                delivery_address: `${form.address}, ${form.city}`,
                payment_method: form.payment_method,
                items: cartItems.map(i => ({ product_id: i.id, quantity: i.quantity }))
            });
            
            // In a real app we'd clear cart here (need to add clearCart to context)
            alert('Order placed successfully! We will contact you via WhatsApp.');
            window.location.href = '/'; // hard reload to clear state for now
        } catch (err) {
            setError('Failed to place order. Please try again.');
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">Your cart is empty.</p>
                </main>
                <Footer />
            </div>
        );
    }

    const inp = 'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white text-sm';

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                            <h3 className="font-bold text-gray-800 border-b pb-2">Delivery Details</h3>
                            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inp} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number *</label>
                                <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inp} placeholder="0771234567" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address *</label>
                                <input required value={form.address} onChange={e => setForm({...form, address: e.target.value})} className={inp} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">City *</label>
                                <input required value={form.city} onChange={e => setForm({...form, city: e.target.value})} className={inp} />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                            <h3 className="font-bold text-gray-800 border-b pb-2">Payment Method</h3>
                            <div className="space-y-3">
                                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${form.payment_method === 'COD' ? 'border-brand-green bg-green-50' : 'border-gray-200'}`}>
                                    <input type="radio" name="payment" checked={form.payment_method === 'COD'} onChange={() => setForm({...form, payment_method: 'COD'})} className="text-brand-green focus:ring-brand-green w-4 h-4" />
                                    <div>
                                        <p className="font-bold text-gray-800">Cash on Delivery</p>
                                        <p className="text-xs text-gray-500">Pay when you receive the goods</p>
                                    </div>
                                </label>
                                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${form.payment_method === 'Bank Transfer' ? 'border-brand-green bg-green-50' : 'border-gray-200'}`}>
                                    <input type="radio" name="payment" checked={form.payment_method === 'Bank Transfer'} onChange={() => setForm({...form, payment_method: 'Bank Transfer'})} className="text-brand-green focus:ring-brand-green w-4 h-4" />
                                    <div>
                                        <p className="font-bold text-gray-800">Bank Transfer</p>
                                        <p className="text-xs text-gray-500">Directly transfer to our account</p>
                                    </div>
                                </label>
                            </div>
                            
                            {form.payment_method === 'Bank Transfer' && (
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
                                    <h4 className="font-bold text-blue-800 text-sm mb-2">Our Bank Details</h4>
                                    <p className="text-sm text-blue-700">Bank: Commercial Bank<br/>Branch: Colombo<br/>Acc Name: Win Lion Agro<br/>Acc No: 1234567890</p>
                                    <p className="text-xs text-blue-600 mt-2 font-semibold">* Please share the payment slip via WhatsApp after placing the order.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
                            <h3 className="font-bold text-gray-800 text-lg mb-4">Order Summary</h3>
                            
                            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar border-b pb-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 line-clamp-1 flex-1">{item.name} x {item.quantity}</span>
                                        <span className="font-semibold text-gray-800">Rs.{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 text-sm text-gray-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-800">Rs.{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span className="font-semibold text-gray-800">{delivery === 0 ? 'Free' : `Rs.${delivery}`}</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-bold">
                                    <span className="text-gray-800">Total</span>
                                    <span className="text-brand-green">Rs.{grandTotal.toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <button disabled={loading} type="submit" className="block text-center w-full py-3.5 rounded-xl text-white font-bold transition-all shadow-lg shadow-green-300/50 disabled:opacity-70 flex justify-center items-center gap-2" style={{ background: 'linear-gradient(135deg, #298d24, #1b5e20)' }}>
                                {loading ? 'Processing...' : 'Place Order via WhatsApp'}
                            </button>
                        </div>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
}
