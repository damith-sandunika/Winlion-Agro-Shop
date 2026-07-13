import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 border border-white/20 mb-4 backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-black text-white">WinLion Agro</h1>
                            <p className="text-green-200 text-xs font-bold uppercase tracking-widest mt-1">Admin Panel</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-1">Welcome back 👋</h2>
                        <p className="text-gray-500 text-sm mb-6">Sign in to your admin account</p>

                        {error && (
                            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
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
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
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
                                className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-300/50 disabled:opacity-60"
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
                            Default: <span className="font-bold text-gray-600">admin@winlion.com</span> / <span className="font-bold text-gray-600">password</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
