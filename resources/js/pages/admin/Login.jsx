import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    // Simulate PWA prompt after 1.5 seconds on the login page
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowInstallPrompt(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.get('/sanctum/csrf-cookie');
            const res = await axios.post('/api/login', form);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-green-50">
            {/* Background Blobs */}
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30" style={{background:'radial-gradient(circle, #bbf7d0, transparent 60%)'}} />
            <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-30" style={{background:'radial-gradient(circle, #d9f99d, transparent 60%)'}} />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-900/10 overflow-hidden border border-white/60">
                    {/* Header */}
                    <div className="px-8 pt-8 pb-6 text-center" style={{ background: 'linear-gradient(135deg, #298d24, #1b5e20)' }}>
                        {/* Low-Poly bg */}
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 60%)' }}></div>
                            <div className="absolute top-4 right-0 w-24 h-24 bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}></div>
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white mb-4 shadow-xl p-3">
                                <img src="/website logo.png" alt="WinLion Logo" className="w-full h-full object-contain" />
                            </div>
                            <h1 className="text-xl font-normal text-white">WinLion Agro</h1>
                            <p className="text-green-200 text-xs font-normal uppercase tracking-widest mt-1">Admin Panel</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        <h2 className="text-xl font-normal text-gray-800 mb-1">Welcome back 👋</h2>
                        <p className="text-gray-500 text-sm mb-6">Sign in to your admin account</p>

                        {error && (
                            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-normal flex items-center gap-2">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-normal text-gray-700 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={e => setForm({...form, email: e.target.value})}
                                    required
                                    placeholder="admin@winlion.com"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-normal text-gray-700 mb-1.5">Password</label>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={e => setForm({...form, password: e.target.value})}
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl text-white font-normal text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-300/50 disabled:opacity-60"
                                style={{ background: loading ? '#6b7280' : 'linear-gradient(135deg, #298d24, #1b5e20)' }}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                                        Signing in...
                                    </>
                                ) : 'Sign In'}
                            </button>
                        </form>

                        <p className="text-center text-xs text-gray-400 mt-6">
                            Default: <span className="font-normal text-gray-600">admin@winlion.com</span> / <span className="font-normal text-gray-600">password</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* PWA Install Prompt Popup */}
            {showInstallPrompt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-500 slide-in-from-bottom-8">
                        <div className="p-8 text-center relative">
                            <button 
                                onClick={() => setShowInstallPrompt(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            
                            <div className="w-24 h-24 mx-auto bg-white rounded-[2rem] shadow-lg border border-gray-100 p-2 mb-6">
                                <img src="/app logo.jpeg" alt="App Logo" className="w-full h-full object-cover rounded-2xl" />
                            </div>
                            
                            <h2 className="text-2xl font-normal text-gray-800 tracking-tight mb-2">Install App</h2>
                            <p className="text-sm text-gray-500 font-normal mb-8 px-4">Add WinLion Agro to your home screen for faster access and a better experience.</p>
                            
                            <button 
                                onClick={() => {
                                    alert('Install flow initiated!'); 
                                    setShowInstallPrompt(false);
                                }}
                                className="w-full py-4 rounded-xl text-white font-normal text-sm tracking-wide shadow-lg shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                                style={{ background: 'linear-gradient(135deg, #298d24, #1b5e20)' }}
                            >
                                INSTALL NOW
                            </button>
                            <button 
                                onClick={() => setShowInstallPrompt(false)}
                                className="w-full mt-3 py-3 text-sm font-normal text-gray-400 hover:text-gray-700 transition-colors"
                            >
                                Not Right Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
