import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // PWA Logic
    const [installPromptEvent, setInstallPromptEvent] = useState(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [isIos, setIsIos] = useState(false);

    useEffect(() => {
        const ua = window.navigator.userAgent;
        const ios = /iphone|ipad|ipod/i.test(ua);
        const standalone = window.navigator.standalone === true;
        const dismissed = localStorage.getItem('pwa_dismissed');

        if (ios && !standalone && !dismissed) {
            setIsIos(true);
            setShowInstallPrompt(true);
            return;
        }

        const handler = (e) => {
            e.preventDefault();
            setInstallPromptEvent(e);
            if (!dismissed) setShowInstallPrompt(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = () => {
        if (isIos) return;
        if (!installPromptEvent) return;
        installPromptEvent.prompt();
        installPromptEvent.userChoice.then(() => {
            setInstallPromptEvent(null);
            setShowInstallPrompt(false);
        });
    };

    const dismissPrompt = () => {
        localStorage.setItem('pwa_dismissed', '1');
        setShowInstallPrompt(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/login', form);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
            {/* PWA Install Banner */}
            {showInstallPrompt && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-bottom-10 fade-in duration-500">
                    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(21,128,61,0.2)] border border-green-100 overflow-hidden">
                        <div className="bg-brand-dark px-4 py-2 flex items-center justify-between">
                            <span className="text-[10px] font-medium text-green-200 uppercase tracking-widest">
                                {isIos ? 'Install App on iPhone' : 'Install App'}
                            </span>
                            <button onClick={dismissPrompt} className="text-green-300 hover:text-white text-lg leading-none font-medium">✕</button>
                        </div>
                        <div className="p-4 flex items-center gap-3">
                            <img src="/app logo.png" alt="Logo" className="w-12 h-12 rounded-xl object-cover shadow" />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm truncate">WinLion Agro</p>
                                {isIos ? (
                                    <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                                        Tap <span className="text-brand-green font-medium">Share</span> then <span>"Add to Home Screen"</span>
                                    </p>
                                ) : (
                                    <p className="text-xs text-gray-500">Install for quick access</p>
                                )}
                            </div>
                            {!isIos && (
                                <button onClick={handleInstall} className="px-4 py-2 bg-brand-green hover:bg-brand-dark text-white text-xs font-medium rounded-lg transition-colors shadow-sm">
                                    Install
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Left Side - Branding */}
            <div className="hidden md:flex md:w-[45%] lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 lg:p-16 text-white" style={{ background: 'linear-gradient(135deg, #15803d, #14532d)' }}>
                {/* Background Patterns */}
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ mixBlendMode: 'overlay' }}>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-400 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[40px] border-white/5 rounded-full"></div>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                    <img src="/website logo.png" alt="Logo" className="w-16 h-16 rounded-2xl bg-white p-2 object-contain shadow-xl ring-2 ring-white/20" />
                    <div>
                        <h1 className="text-3xl font-medium tracking-tight leading-none">WinLion Agro</h1>
                        <p className="text-xs font-medium text-green-300 uppercase tracking-widest mt-1">Management System</p>
                    </div>
                </div>

                <div className="relative z-10 max-w-lg mt-12">
                    <h2 className="text-4xl lg:text-5xl font-medium mb-6 leading-tight drop-shadow-sm">Manage your fresh produce seamlessly.</h2>
                    <p className="text-green-100/90 text-lg leading-relaxed font-light">Access orders, update inventory, and manage your customers in one secure and beautifully designed platform.</p>
                </div>

                <div className="relative z-10 mt-12">
                    <p className="text-[10px] font-medium text-green-300 uppercase tracking-widest">Powered by <span className="text-white">DSRZone</span></p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 relative bg-slate-50 md:bg-white overflow-hidden">
                {/* Mobile Decorative Blobs */}
                <div className="absolute inset-0 pointer-events-none md:hidden overflow-hidden">
                    <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-green-100/50 blur-3xl opacity-70"></div>
                    <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-lime-100/50 blur-3xl opacity-70"></div>
                </div>

                {/* Mobile Logo */}
                <div className="md:hidden relative z-10 flex flex-col items-center mb-10 text-center">
                    <img src="/website logo.png" alt="Logo" className="w-24 h-24 rounded-2xl bg-white p-3 object-contain shadow-xl ring-4 ring-white mb-5" />
                    <h2 className="text-2xl font-medium text-slate-800 tracking-tight leading-none">WinLion Agro</h2>
                    <p className="text-[10px] font-medium text-brand-green uppercase tracking-[0.15em] mt-2">Admin Login</p>
                </div>

                <div className="mx-auto w-full max-w-sm relative z-10">
                    <div className="hidden md:block mb-8">
                        <h2 className="text-3xl font-medium text-slate-800 tracking-tight">Welcome back</h2>
                        <p className="text-sm text-slate-500 mt-2 font-light">Please enter your details to sign in.</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium text-center shadow-sm">
                            {error}
                        </div>
                    )}

                    <div className="bg-white md:bg-transparent py-8 px-6 md:p-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:shadow-none sm:rounded-3xl border border-gray-100 md:border-none">
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={e => setForm({...form, email: e.target.value})}
                                    className="appearance-none block w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all shadow-sm"
                                    placeholder="admin@winlion.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={form.password}
                                    onChange={e => setForm({...form, password: e.target.value})}
                                    className="appearance-none block w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all shadow-sm"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-lg text-sm font-medium text-white bg-brand-green hover:bg-brand-dark hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 active:scale-[0.98]"
                                >
                                    {loading ? 'Signing in...' : 'Sign In to Dashboard'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
