import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sprout, Leaf, Tag, ShoppingCart } from 'lucide-react';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

const Home = () => {
    const [todaysPicks, setTodaysPicks] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/public/products')
            .then(res => {
                // Map database fields to what ProductCard expects
                const formatted = res.data.map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.discount_price || p.selling_price,
                    oldPrice: p.discount_price ? p.selling_price : null,
                    unit: p.unit_type || 'kg',
                    image: p.images && p.images.length > 0 ? `/storage/${p.images[0]}` : 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80',
                    discount: p.discount_price ? Math.round(((p.selling_price - p.discount_price) / p.selling_price) * 100) : 0,
                    reviewsCount: Math.floor(Math.random() * 100) + 10 // Mock reviews for now
                }));
                
                // Just split the data for demonstration
                setTodaysPicks(formatted.slice(0, 4));
                setFeaturedProducts(formatted.slice(4, 12));
            })
            .catch(err => console.error("Error loading products:", err));
    }, []);


    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main>
                <div className="w-full">
                    <HeroSlider />
                </div>
                
                <CategoryGrid />
                
                <ProductGrid 
                    title="Today's Fresh Picks" 
                    products={todaysPicks} 
                    icon={<Sprout className="text-brand-green w-6 h-6 animate-bounce" />}
                />

                {/* Promotional Banner */}
                <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
                    <div className="bg-gradient-to-r from-[#e8f5e9] to-[#c8e6c9] rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-[0_20px_50px_rgba(41,141,36,0.1)] border border-green-200/50">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="md:w-1/2 z-10 relative">
                            <span className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-sm text-brand-green font-bold text-xs tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full shadow-sm border border-white/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <Tag size={14} /> Special Offer
                            </span>
                            <h2 className="text-5xl md:text-6xl font-extrabold text-brand-dark mb-2 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">20% OFF</h2>
                            <h3 className="text-3xl font-bold text-gray-800 mb-4 tracking-wide animate-in fade-in slide-in-from-bottom-8 duration-1000">ON ORGANIC FRUITS</h3>
                            <p className="text-gray-700 mb-8 text-lg md:text-xl font-medium max-w-md animate-in fade-in slide-in-from-bottom-10 duration-1000">Limited time offer. Shop now and enjoy the premium freshness delivered to your door!</p>
                            <button className="bg-brand-green hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-[0_8px_20px_rgba(21,128,61,0.3)] hover:shadow-[0_8px_25px_rgba(21,128,61,0.4)] hover:-translate-y-1 flex items-center gap-2 group animate-in zoom-in duration-1000">
                                Shop Offer Now <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <div className="md:w-1/2 relative mt-12 md:mt-0 flex justify-center md:justify-end z-10">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl transform scale-150"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80" 
                                    alt="Organic Fruits" 
                                    className="w-[22rem] h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-700 ease-out relative z-10"
                                />
                                <div className="absolute -top-6 -right-6 bg-yellow-400 text-brand-dark w-28 h-28 rounded-full flex flex-col items-center justify-center font-black text-2xl leading-none rotate-12 shadow-xl border-4 border-white z-20 animate-[bounce_3s_infinite]">
                                    <span>100%</span>
                                    <span className="text-sm font-bold mt-1">ORGANIC</span>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Background Elements */}
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-green rounded-full opacity-10 blur-3xl"></div>
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-300 rounded-full opacity-10 blur-3xl"></div>
                    </div>
                </section>

                <ProductGrid 
                    title="Featured Products" 
                    products={featuredProducts} 
                    icon={<Leaf className="text-brand-green w-6 h-6 animate-pulse" />}
                />

                <Features />
                
                <Testimonials />
            </main>

            <Footer />
            <MobileNav />
        </div>
    );
};

export default Home;
