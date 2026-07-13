import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        { name: 'Dashboard', route: '/admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z' },
        { name: 'Orders', route: '/admin/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
        { name: 'Products', route: '/admin/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { name: 'Categories', route: '/admin/categories', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
        { name: 'Customers', route: '/admin/customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z' },
        { name: 'Suppliers', route: '/admin/suppliers', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        { name: 'Reports', route: '/admin/reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { name: 'Settings', route: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];

    const isActive = (routePath) => {
        if (routePath === '/admin') return url === '/admin';
        return url === routePath || url.startsWith(routePath + '/');
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-[#116A34] text-white overflow-hidden relative">
            {/* Background Circles similar to Education Center */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 border-[20px] border-white/5 rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 border-[20px] border-white/5 rounded-full pointer-events-none"></div>

            {/* Logo Area */}
            <div className="py-8 flex flex-col items-center justify-center relative z-10 border-b border-white/10">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md mb-3">
                    <span className="text-[#116A34] font-black text-2xl">W</span>
                </div>
                <h1 className="text-[13px] font-black tracking-wide">WINLION AGRO</h1>
                <p className="text-[9px] text-green-200 tracking-[0.2em] mt-1">MANAGEMENT SYSTEM</p>
            </div>

            {/* Nav Menu */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 relative z-10 custom-scrollbar">
                {menuItems.map((item) => {
                    const active = isActive(item.route);
                    return (
                        <Link
                            key={item.name}
                            to={item.route}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-[13px] font-bold ${
                                active 
                                ? 'bg-gradient-to-r from-white/90 to-white text-[#116A34] shadow-sm relative overflow-hidden' 
                                : 'text-green-50 hover:bg-white/10'
                            }`}
                        >
                            {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-md"></div>}
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d={item.icon} />
                            </svg>
                            <span>{item.name}</span>
                            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#116A34]"></div>}
                        </Link>
                    );
                })}
            </nav>

            <div className="py-4 text-center border-t border-white/10 relative z-10">
                <p className="text-[9px] text-green-200 tracking-widest font-bold">POWERED BY WINLION</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex bg-[#f8fafc] font-sans">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex w-64 flex-col fixed h-full z-20 shadow-2xl">
                <SidebarContent />
            </aside>

            {/* Sidebar Mobile Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar Mobile */}
            <aside className={`md:hidden fixed top-0 left-0 h-full w-64 flex flex-col z-40 transform transition-transform duration-300 shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen min-w-0">
                
                {/* Top Header - Extending the sidebar color */}
                <header className="h-[72px] bg-[#116A34] flex items-center justify-between px-6 sticky top-0 z-10 shadow-md relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/4 w-32 h-32 border-[16px] border-white/5 rounded-full pointer-events-none -translate-y-1/2"></div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-white hover:bg-white/10 p-2 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <h2 className="text-white font-bold text-sm hidden sm:block tracking-wide uppercase opacity-90">WinLion Agro</h2>
                    </div>

                    <div className="flex items-center gap-5 relative z-10">
                        <button className="text-green-50 hover:text-white relative">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#116A34]"></span>
                        </button>

                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[13px] font-bold text-white leading-none">{user.name}</p>
                                    <p className="text-[10px] text-green-200 uppercase tracking-widest mt-1 font-bold">ADMIN</p>
                                </div>
                                <div className="w-9 h-9 bg-white text-[#116A34] rounded-full flex items-center justify-center font-black text-sm shadow-md">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            </button>
                            
                            {dropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-1">
                                        <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content padding and styling */}
                <main className="flex-1 p-5 md:p-8 max-w-full overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
