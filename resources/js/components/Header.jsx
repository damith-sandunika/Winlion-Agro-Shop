import React from 'react';
import { Search, Heart, ShoppingCart, User, Menu, ChevronDown, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { cartCount, wishlist } = useCart();
    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            {/* Top Bar - Desktop */}
            <div className="hidden lg:flex justify-between items-center py-2 px-6 border-b text-sm text-gray-600 bg-brand-light">
                <div className="flex gap-4">
                    <span>Fresh From Farm</span>
                    <span>100% Natural</span>
                    <span>Premium Quality</span>
                </div>
                <div className="flex gap-4 items-center">
                    <span>Deliver to: Colombo, Sri Lanka</span>
                    <span>Help & Support</span>
                    <div className="flex gap-2">
                        {/* Social Icons Placeholders */}
                        <span className="w-4 h-4 bg-gray-300 rounded-full inline-block"></span>
                        <span className="w-4 h-4 bg-gray-300 rounded-full inline-block"></span>
                        <span className="w-4 h-4 bg-gray-300 rounded-full inline-block"></span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="flex justify-between items-center py-4 px-4 lg:px-6 max-w-7xl mx-auto">
                {/* Logo and Menu Toggle (Mobile) */}
                <div className="flex items-center gap-4">
                    <button className="lg:hidden p-2 text-gray-600">
                        <Menu size={24} />
                    </button>
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl">W</div>
                        <div>
                            <h1 className="font-bold text-xl leading-none text-gray-800">WIN LION</h1>
                            <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">Agro Products</span>
                        </div>
                    </Link>
                </div>

                {/* All Categories Dropdown (Desktop) */}
                <div className="hidden lg:flex items-center ml-8">
                    <button className="flex items-center gap-2 bg-brand-green text-white px-4 py-2.5 rounded-lg font-medium hover:bg-brand-dark transition-colors">
                        <List size={20} />
                        All Categories
                        <ChevronDown size={16} />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
                    <input 
                        type="text" 
                        placeholder="Search fresh fruits, vegetables, seeds, fertilizers..." 
                        className="w-full pl-4 pr-12 py-2.5 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-brand-green focus:bg-white transition-all outline-none"
                    />
                    <button className="absolute right-0 top-0 h-full px-4 bg-brand-green text-white rounded-r-lg hover:bg-brand-dark transition-colors">
                        <Search size={20} />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <button className="hidden lg:flex flex-col items-center text-gray-600 hover:text-brand-green transition-colors relative">
                        <div className="relative">
                            <Heart size={22} />
                            {wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{wishlist.length}</span>}
                        </div>
                        <span className="text-xs font-medium mt-1">Wishlist</span>
                    </button>
                    <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-brand-green transition-colors relative">
                        <div className="relative">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-brand-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cartCount}</span>}
                        </div>
                        <span className="text-xs font-medium mt-1 hidden lg:block">Cart</span>
                    </Link>
                    <button className="hidden lg:flex flex-col items-center text-gray-600 hover:text-brand-green transition-colors">
                        <User size={22} />
                        <span className="text-xs font-medium mt-1">Login / Register</span>
                    </button>
                </div>
            </div>

            {/* Bottom Nav Links (Desktop) */}
            <div className="hidden lg:block border-t border-gray-100">
                <nav className="flex justify-center gap-8 py-3 max-w-7xl mx-auto px-6 text-sm font-semibold text-gray-700">
                    <Link to="/" className="text-brand-green">Home</Link>
                    <Link to="/category/fruits" className="hover:text-brand-green transition-colors">Fresh Fruits</Link>
                    <Link to="/category/vegetables" className="hover:text-brand-green transition-colors">Vegetables</Link>
                    <Link to="/category/seeds" className="hover:text-brand-green transition-colors">Seeds</Link>
                    <Link to="/category/fertilizer" className="hover:text-brand-green transition-colors">Fertilizer</Link>
                    <Link to="/category/plants" className="hover:text-brand-green transition-colors">Plants</Link>
                    <Link to="/category/tools" className="hover:text-brand-green transition-colors">Tools & Equipments</Link>
                    <Link to="/offers" className="hover:text-brand-green transition-colors">Offers</Link>
                    <Link to="/contact" className="hover:text-brand-green transition-colors">Contact</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
