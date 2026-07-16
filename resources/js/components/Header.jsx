import React from 'react';
import { Search, ShoppingCart, User, Menu, ChevronDown, List, Phone, Mail, Facebook, Instagram, Twitter, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const query = formData.get('q');
        if (query) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };
    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            {/* Top Bar - Desktop */}
            <div className="hidden lg:flex justify-between items-center py-2 px-4 lg:px-6 max-w-7xl mx-auto border-b text-[13px] text-gray-600 bg-brand-light w-full">
                <div className="flex gap-6">
                    <a href="tel:+94771234567" className="flex items-center gap-1.5 hover:text-brand-green transition-colors">
                        <Phone size={14} />
                        <span>+94 77 123 4567</span>
                    </a>
                    <a href="mailto:info@winlion.com" className="flex items-center gap-1.5 hover:text-brand-green transition-colors">
                        <Mail size={14} />
                        <span>info@winlion.com</span>
                    </a>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="font-medium">Follow Us:</span>
                    <div className="flex gap-3">
                        <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors"><Facebook size={16} /></a>
                        <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors"><Instagram size={16} /></a>
                        <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors"><Twitter size={16} /></a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="flex justify-between items-center py-1 px-4 lg:px-6 max-w-7xl w-full mx-auto">
                {/* Logo and Menu Toggle (Mobile) */}
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-gray-600 hover:text-brand-green transition-colors">
                        <Menu size={24} />
                    </button>
                    <Link to="/" className="flex items-center">
                        <img src="/website logo.png" alt="WinLion Logo" className="w-32 h-16 md:w-64 md:h-24 object-contain" />
                    </Link>
                </div>



                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8 lg:mx-12 relative">
                    <input
                        type="text"
                        name="q"
                        placeholder="Search fresh fruits, vegetables, seeds, fertilizers..."
                        className="w-full pl-4 pr-12 py-2.5 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-brand-green focus:bg-white transition-all outline-none"
                    />
                    <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-brand-green text-white rounded-r-lg hover:bg-brand-dark transition-colors">
                        <Search size={20} />
                    </button>
                </form>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-brand-green transition-colors relative">
                        <div className="relative">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-brand-green text-white text-[10px] font-normal px-1.5 py-0.5 rounded-full">{cartCount}</span>}
                        </div>
                        <span className="text-xs font-normal mt-1 hidden lg:block">Cart</span>
                    </Link>
                    <Link to="/login" className="hidden lg:flex flex-col items-center text-gray-600 hover:text-brand-green transition-colors">
                        <User size={22} />
                        <span className="text-xs font-normal mt-1">Login</span>
                    </Link>
                </div>
            </div>

            {/* Bottom Nav Links (Desktop) */}
            <div className="hidden lg:block border-t border-gray-100 bg-white">
                <nav className="flex items-center justify-between py-1 w-full max-w-7xl mx-auto px-4 lg:px-6 text-sm font-normal text-gray-700">
                    <div className="flex items-center">
                        <button className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-lg font-normal hover:bg-brand-dark transition-colors shadow-sm">
                            <List size={18} />
                            All Categories
                            <ChevronDown size={16} />
                        </button>
                    </div>
                    <div className="flex justify-center gap-8 flex-1">
                        <Link to="/" className="text-brand-green">Home</Link>
                        <Link to="/category/fruits" className="hover:text-brand-green transition-colors">Fresh Fruits</Link>
                        <Link to="/category/vegetables" className="hover:text-brand-green transition-colors">Vegetables</Link>
                        <Link to="/category/seeds" className="hover:text-brand-green transition-colors">Seeds</Link>
                        <Link to="/category/fertilizer" className="hover:text-brand-green transition-colors">Fertilizer</Link>
                        <Link to="/category/plants" className="hover:text-brand-green transition-colors">Plants</Link>
                        <Link to="/category/tools" className="hover:text-brand-green transition-colors">Tools & Equipments</Link>
                        <Link to="/offers" className="hover:text-brand-green transition-colors">Offers</Link>
                        <Link to="/contact" className="hover:text-brand-green transition-colors">Contact</Link>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-brand-light/30">
                    <img src="/website logo.png" alt="WinLion Logo" className="h-10 object-contain" />
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-red-500 bg-white rounded-full shadow-sm transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-2">Main Menu</span>
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="text-gray-700 hover:text-brand-green hover:bg-green-50 px-4 py-3 rounded-xl transition-colors font-medium">Home</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/fruits" className="text-gray-700 hover:text-brand-green hover:bg-green-50 px-4 py-3 rounded-xl transition-colors font-medium">Fresh Fruits</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/vegetables" className="text-gray-700 hover:text-brand-green hover:bg-green-50 px-4 py-3 rounded-xl transition-colors font-medium">Vegetables</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/seeds" className="text-gray-700 hover:text-brand-green hover:bg-green-50 px-4 py-3 rounded-xl transition-colors font-medium">Seeds</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/fertilizer" className="text-gray-700 hover:text-brand-green hover:bg-green-50 px-4 py-3 rounded-xl transition-colors font-medium">Fertilizer</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/plants" className="text-gray-700 hover:text-brand-green hover:bg-green-50 px-4 py-3 rounded-xl transition-colors font-medium">Plants</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/tools" className="text-gray-700 hover:text-brand-green hover:bg-green-50 px-4 py-3 rounded-xl transition-colors font-medium">Tools & Equipments</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/offers" className="text-gray-700 hover:text-brand-green hover:bg-green-50 px-4 py-3 rounded-xl transition-colors font-medium">Offers</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact" className="text-gray-700 hover:text-brand-green hover:bg-green-50 px-4 py-3 rounded-xl transition-colors font-medium">Contact</Link>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4 px-2">
                        <a href="tel:+94771234567" className="flex items-center gap-3 text-gray-600 hover:text-brand-green">
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-brand-green"><Phone size={16} /></div>
                            <span className="font-medium">+94 77 123 4567</span>
                        </a>
                        <a href="mailto:info@winlion.com" className="flex items-center gap-3 text-gray-600 hover:text-brand-green">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Mail size={16} /></div>
                            <span className="font-medium">info@winlion.com</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
