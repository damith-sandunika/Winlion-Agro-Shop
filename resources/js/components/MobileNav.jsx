import React from 'react';
import { Home, Grid, Tag, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/categories', icon: Grid, label: 'Categories' },
        { path: '/offers', icon: Tag, label: 'Offers' },
        { path: '/account', icon: User, label: 'Account' },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-between items-center px-6 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link 
                        key={item.label} 
                        to={item.path} 
                        className={`flex flex-col items-center gap-1 ${isActive ? 'text-brand-green' : 'text-gray-500 hover:text-brand-green'}`}
                    >
                        <item.icon size={20} className={isActive ? 'fill-current' : ''} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
};

export default MobileNav;
