import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white pt-10 pb-6 md:pt-16 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8 mb-10">
                    {/* Brand & About */}
                    <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
                        <Link to="/" className="inline-block mb-5 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-2 shadow-lg">
                            <img src="/website logo.png" alt="WinLion Logo" className="w-28 h-14 md:w-48 md:h-20 object-contain" />
                        </Link>
                        <p className="text-green-100/90 text-sm mb-6 max-w-sm leading-relaxed">
                            We provide high quality agro products, fresh fruits, vegetables and more directly from farmers to your doorstep.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                                <Globe size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                                <Mail size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                                <Phone size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links & Categories - 2 columns on mobile */}
                    <div className="grid grid-cols-2 gap-8 lg:col-span-2 w-full">
                        {/* Quick Links */}
                        <div>
                            <h4 className="font-medium text-base md:text-lg mb-4 md:mb-6">Quick Links</h4>
                            <ul className="space-y-2.5 text-sm text-green-100/90">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
                            <li><Link to="/offers" className="hover:text-white transition-colors">Offers</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
                        </ul>
                    </div>

                        {/* Categories */}
                        <div>
                            <h4 className="font-medium text-base md:text-lg mb-4 md:mb-6">Categories</h4>
                            <ul className="space-y-2.5 text-sm text-green-100/90">
                            <li><Link to="/category/fruits" className="hover:text-white transition-colors">Fresh Fruits</Link></li>
                            <li><Link to="/category/vegetables" className="hover:text-white transition-colors">Vegetables</Link></li>
                            <li><Link to="/category/seeds" className="hover:text-white transition-colors">Seeds</Link></li>
                            <li><Link to="/category/fertilizer" className="hover:text-white transition-colors">Fertilizer</Link></li>
                            <li><Link to="/category/plants" className="hover:text-white transition-colors">Plants & Saplings</Link></li>
                            <li><Link to="/category/feed" className="hover:text-white transition-colors">Animal Feed</Link></li>
                        </ul>
                        </div>
                    </div>

                    {/* Customer Support */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left mt-2 md:mt-0">
                        <h4 className="font-medium text-base md:text-lg mb-4 md:mb-6">Newsletter</h4>
                        <p className="text-[13px] md:text-sm text-green-100/90 mb-4 max-w-xs">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <form className="flex flex-col gap-3">
                            <input type="email" placeholder="Enter your email" className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-green" />
                            <button className="bg-brand-green hover:bg-green-600 px-4 py-2.5 rounded-lg font-normal transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 md:pt-8 mt-4 md:mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-[12px] md:text-sm text-green-200/80">
                        &copy; {new Date().getFullYear()} Win Lion Agro Products. All Rights Reserved.
                    </p>
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                        <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                            <span className="text-[10px] font-normal text-blue-800">VISA</span>
                        </div>
                        <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-red-500 -mr-1"></div>
                            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                        </div>
                        <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                            <span className="text-[10px] font-normal text-sky-500">AMEX</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
