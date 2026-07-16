import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BG_STYLE = `
@keyframes saBlob1 {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  33%       { transform: translate(40px, -40px) scale(1.1); }
  66%       { transform: translate(-20px, 40px) scale(0.95); }
}
@keyframes saBlob2 {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  33%       { transform: translate(-50px, 30px) scale(1.08); }
  66%       { transform: translate(30px, -40px) scale(0.92); }
}
.sa-blob { animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
.sa-blob1 { animation: saBlob1 15s infinite; }
.sa-blob2 { animation: saBlob2 18s infinite; }
`;

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const url = location.pathname;

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin User', email: 'admin@winlion.com' };

    const handleLogout = async () => {
        try { await axios.post('/api/logout'); } catch (_) {}
        navigate('/admin/login');
    };

    const menuItems = [
        { name: 'Dashboard', route: '/admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { name: 'Orders', route: '/admin/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
        { name: 'Products', route: '/admin/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { name: 'Categories', route: '/admin/categories', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
        { name: 'Inventory', route: '/admin/inventory', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { name: 'Coupons', route: '/admin/coupons', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
        { name: 'Customers', route: '/admin/customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z' },
        { name: 'Suppliers', route: '/admin/suppliers', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        { name: 'Settings', route: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];

    const isActive = (routePath) => {
        if (routePath === '/admin') return url === '/admin';
        return url === routePath || url.startsWith(routePath + '/');
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full text-blue-50 relative overflow-hidden shadow-[4px_0_24px_rgba(255,255,255,0.1)] border-r border-white/5" style={{ backgroundColor: '#1933C6' }}>
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ mixBlendMode: 'overlay' }}>
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 60%)' }}></div>
                <div className="absolute top-20 right-0 w-48 h-48 bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}></div>
                <div className="absolute top-64 -left-10 w-72 h-72 bg-blue-300" style={{ clipPath: 'polygon(20% 0%, 100% 20%, 80% 100%, 0% 80%)' }}></div>
                <div className="absolute bottom-10 right-0 w-56 h-56 bg-cyan-200" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white" style={{ clipPath: 'polygon(0 40%, 60% 0, 100% 60%, 40% 100%)' }}></div>
            </div>

            <div className="relative flex flex-col items-center py-7 px-4 border-b border-white/10 z-10">
                <div className="h-16 w-16 rounded-2xl bg-[#090087] border border-white/20 flex items-center justify-center mb-3 shadow-lg backdrop-blur-sm p-1.5">
                    <img src="/dashbord logo.png" alt="Dashboard Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-sm font-normal text-white text-center leading-tight">WinLion Agro</h1>
                <span className="mt-1 text-[10px] font-normal text-blue-200 uppercase tracking-widest">Admin Dashboard</span>
            </div>

            <nav className="relative flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar z-10">
                <div className="text-[10px] font-normal uppercase tracking-widest text-blue-300/50 px-3 mb-2">Main Menu</div>
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.route}
                        onClick={() => setSidebarOpen(false)}
                        className={`group relative flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-200 font-normal overflow-hidden ${
                            isActive(item.route)
                                ? 'bg-white text-[#1933C6] shadow-[0_4px_20px_rgba(0,0,0,0.15)] ring-1 ring-black/5'
                                : 'text-blue-100/80 hover:bg-white/10 hover:text-white hover:translate-x-1'
                        }`}
                    >
                        {!isActive(item.route) && (
                            <div className="absolute bottom-0 left-2 right-2 h-px rounded-full pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)' }}></div>
                        )}
                        {isActive(item.route) && (
                            <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(25,51,198,0.35), transparent)' }}></div>
                        )}
                        <svg className={`relative z-10 flex-shrink-0 h-5 w-5 transition-transform duration-200 ${isActive(item.route) ? 'text-[#1933C6]' : 'group-hover:scale-110'}`}
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                        </svg>
                        <span className="relative z-10 flex-1">{item.name}</span>
                        {isActive(item.route) && <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-[#1933C6] animate-pulse" />}
                    </Link>
                ))}
            </nav>
            <div className="relative px-4 py-2 mt-auto border-t border-white/10 text-center z-10 bg-white/5 backdrop-blur-md overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-50 bg-gradient-to-t from-white/10 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-16 bg-white/20 rounded-full blur-2xl"></div>
                
                <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
                    <div className="absolute top-1 left-2 w-6 h-6 rounded-full border border-white/40"></div>
                    <div className="absolute -bottom-2 right-4 w-10 h-10 rounded-full border-2 border-white/20"></div>
                    <div className="absolute top-2 right-1 w-2 h-2 rounded-full bg-white/50"></div>
                    <div className="absolute bottom-1 left-6 w-3 h-3 rounded-full border border-white/60"></div>
                </div>

                <p className="relative z-10 text-[8px] text-blue-100 uppercase tracking-widest font-normal mb-0.5">Powered by</p>
                <p className="relative z-10 text-xs font-normal text-white tracking-widest uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">WinLion</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex overflow-x-hidden max-w-[100vw] relative bg-blue-50">
            <style>{BG_STYLE}</style>

            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="sa-blob sa-blob1 absolute top-[-100px] left-[-50px] w-[600px] h-[600px] rounded-full opacity-30"
                     style={{background:'radial-gradient(circle, #bfdbfe, transparent 60%)'}} />
                <div className="sa-blob sa-blob2 absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-30"
                     style={{background:'radial-gradient(circle, #a5b4fc, transparent 60%)'}} />
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className="hidden md:flex w-64 flex-col fixed h-full z-10 shadow-2xl shadow-slate-900/5">
                <SidebarContent />
            </aside>

            <aside className={`md:hidden fixed top-0 left-0 h-full w-64 flex flex-col z-30 transform transition-transform duration-300 shadow-2xl shadow-slate-900/20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent />
            </aside>

            <div className="flex-1 md:ml-64 flex flex-col min-h-screen min-w-0 relative z-10">
                <header className="h-16 sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 relative shadow-md" style={{ backgroundColor: '#090087' }}>
                    <div className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-around overflow-hidden">
                        <div className="w-48 h-48 rounded-full border-[16px] border-white/10 -translate-y-12"></div>
                        <div className="w-24 h-24 rounded-full border-8 border-white/20 translate-y-8"></div>
                        <div className="w-64 h-64 rounded-full border-[24px] border-white/5 -translate-y-16"></div>
                        <div className="w-16 h-16 rounded-full border-4 border-white/30 translate-y-6"></div>
                    </div>

                    <div className="flex items-center gap-3 z-10">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="md:hidden p-2 -ml-1 rounded-xl text-blue-100 hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="hidden md:block">
                            <p className="text-[11px] font-normal text-white uppercase tracking-widest leading-none">WinLion Console</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 z-10">
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-3 focus:outline-none group"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-normal text-white leading-none">{user.name}</p>
                                    <p className="text-[10px] font-normal text-blue-200 uppercase tracking-widest mt-0.5">Admin</p>
                                </div>
                                <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-[#090087] font-normal text-sm flex-shrink-0 shadow-md transition-transform group-hover:scale-105">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            </button>

                            {dropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                                    <div className="absolute right-0 mt-3 w-48 rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden bg-white/95 backdrop-blur-xl">
                                        <div className="px-4 py-3 border-b border-slate-50">
                                            <p className="text-sm font-normal text-slate-800">{user.name}</p>
                                            <p className="text-[10px] text-slate-400 font-normal mt-0.5 truncate">{user.email}</p>
                                        </div>
                                        <div className="py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-normal text-rose-500 hover:bg-rose-50 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-6 overflow-x-hidden max-w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
