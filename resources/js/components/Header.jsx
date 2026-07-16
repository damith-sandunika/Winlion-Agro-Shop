import React from 'react';
import { Search, ShoppingCart, Menu, ChevronDown, List, X, Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useQuickView } from '../context/QuickViewContext';

const Header = () => {
    const { cartCount, addToCart } = useCart();
    const { openQuickView } = useQuickView();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    
    // Live Search States
    const [searchQuery, setSearchQuery] = React.useState('');
    const [allProducts, setAllProducts] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const [isSearchFocused, setIsSearchFocused] = React.useState(false);

    // Fetch products for search
    React.useEffect(() => {
        axios.get('/api/public/products')
            .then(res => {
                const formatted = res.data.map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.discount_price || p.selling_price,
                    oldPrice: p.discount_price ? p.selling_price : null,
                    unit: p.unit_type || 'kg',
                    image: p.images && p.images.length > 0 ? `/storage/${p.images[0]}` : 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80',
                    description: p.description || 'Premium quality farm fresh product.'
                }));
                setAllProducts(formatted);
            })
            .catch(err => console.error("Error loading products for search:", err));
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.trim().length > 0) {
            const results = allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
            setSearchResults(results.slice(0, 6)); // show top 6
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchFocused(false);
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleProductClick = (product) => {
        setIsSearchFocused(false);
        setSearchQuery('');
        openQuickView(product);
    };
    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">

            {/* Main Header */}
            <div className="flex justify-between items-center py-1 px-4 lg:px-6 max-w-7xl w-full mx-auto relative">
                
                {/* Mobile Menu Toggle */}
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-brand-green transition-colors z-10">
                    <Menu size={24} />
                </button>

                {/* Logo */}
                <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center z-10">
                    <img src="/website logo.png" alt="WinLion Logo" className="w-32 h-16 md:w-64 md:h-24 object-contain" />
                </Link>

                {/* Desktop Search Bar */}
                <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-2xl mx-8 relative z-50">
                    <input
                        type="text"
                        name="q"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        placeholder="Search fresh fruits, vegetables, seeds, fertilizers..."
                        className="w-full pl-4 pr-12 py-2.5 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-brand-green focus:bg-white transition-all outline-none relative z-20"
                        autoComplete="off"
                    />
                    <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-brand-green text-white rounded-r-lg hover:bg-brand-dark transition-colors z-20">
                        <Search size={20} />
                    </button>
                    
                    {/* Live Search Dropdown Desktop */}
                    {isSearchFocused && searchQuery.length > 0 && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-30 max-h-[400px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                            {searchResults.length > 0 ? (
                                <div className="flex flex-col">
                                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">Products</div>
                                    {searchResults.map(product => (
                                        <div 
                                            key={product.id} 
                                            className="flex items-center gap-4 px-4 py-3 hover:bg-green-50 transition-colors border-b border-gray-50 last:border-0 group"
                                        >
                                            <div className="flex-1 flex items-center gap-4 cursor-pointer" onMouseDown={(e) => { e.preventDefault(); handleProductClick(product); }}>
                                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-50" />
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-sm font-bold text-brand-green">Rs {Number(product.price).toFixed(2)}</span>
                                                        {product.oldPrice && <span className="text-xs text-gray-400 line-through">Rs {Number(product.oldPrice).toFixed(2)}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <button 
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    addToCart(product, 1);
                                                    setIsSearchFocused(false);
                                                    setSearchQuery('');
                                                }}
                                                className="p-2.5 bg-green-100 hover:bg-brand-green text-brand-green hover:text-white rounded-full transition-colors shrink-0 shadow-sm"
                                                title="Add to Cart"
                                            >
                                                <ShoppingCart size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="p-3 border-t border-gray-100 text-center">
                                        <button onClick={handleSearchSubmit} className="text-sm text-brand-green font-medium hover:underline">View all results for "{searchQuery}"</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500 text-sm">
                                    No products found matching "{searchQuery}"
                                </div>
                            )}
                        </div>
                    )}
                </form>



                {/* Actions */}
                <div className="flex items-center gap-6 z-10">
                    <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-brand-green transition-colors relative">
                        <div className="relative">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-brand-green text-white text-[10px] font-normal px-1.5 py-0.5 rounded-full">{cartCount}</span>}
                        </div>
                        <span className="text-xs font-normal mt-1 hidden lg:block">Cart</span>
                    </Link>
                    <Link to="/categories" className="hidden lg:flex flex-col items-center text-gray-600 hover:text-brand-green transition-colors">
                        <List size={22} />
                        <span className="text-xs font-normal mt-1">Categories</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Search Bar Row (Moved outside flex container) */}
            <div className="md:hidden px-4 pb-3 pt-2 border-b border-gray-100 bg-white">
                <form onSubmit={handleSearchSubmit} className="flex relative z-50">
                    <input
                        type="text"
                        name="q"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        placeholder="Search fresh fruits, vegetables..."
                        className="w-full pl-4 pr-12 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none relative z-20 text-sm shadow-sm"
                        autoComplete="off"
                    />
                    <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-brand-green text-white rounded-r-lg hover:bg-brand-dark transition-colors z-20">
                        <Search size={18} />
                    </button>
                    
                    {/* Live Search Dropdown Mobile */}
                    {isSearchFocused && searchQuery.length > 0 && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-30 max-h-[300px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                            {searchResults.length > 0 ? (
                                <div className="flex flex-col">
                                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">Products</div>
                                    {searchResults.map(product => (
                                        <div 
                                            key={product.id} 
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-green-50 transition-colors border-b border-gray-50 last:border-0 group"
                                        >
                                            <div className="flex-1 flex items-center gap-3 cursor-pointer" onMouseDown={(e) => { e.preventDefault(); handleProductClick(product); }}>
                                                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover bg-gray-50" />
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900 leading-tight">{product.name}</h4>
                                                    <span className="text-sm font-bold text-brand-green">Rs {Number(product.price).toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <button 
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    addToCart(product, 1);
                                                    setIsSearchFocused(false);
                                                    setSearchQuery('');
                                                }}
                                                className="p-2 bg-green-100 hover:bg-brand-green text-brand-green hover:text-white rounded-full transition-colors shrink-0 shadow-sm"
                                                title="Add to Cart"
                                            >
                                                <ShoppingCart size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 text-center text-gray-500 text-sm">No products found</div>
                            )}
                        </div>
                    )}
                </form>
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
