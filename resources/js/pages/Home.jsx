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
                    <div 
                        className="rounded-[2rem] p-10 md:p-14 flex flex-col justify-center overflow-hidden relative shadow-lg min-h-[400px] border border-green-200/50 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80')" }}
                    >
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="z-10 relative max-w-xl text-white">
                            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-xs tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full border border-white/30 animate-in fade-in slide-in-from-bottom-4 duration-700 font-normal">
                                <Tag size={14} /> Fresh Arrival
                            </span>
                            <h2 className="text-xl md:text-2xl mb-2 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 font-normal text-white drop-shadow-md">Farm Fresh Organic</h2>
                            <h3 className="text-2xl mb-4 tracking-wide animate-in fade-in slide-in-from-bottom-8 duration-1000 font-normal text-green-100 drop-shadow-sm">HANDPICKED FOR YOU</h3>
                            <p className="mb-8 text-lg md:text-xl max-w-md animate-in fade-in slide-in-from-bottom-10 duration-1000 font-light text-white/90">Experience the true taste of nature. Premium quality fruits and vegetables delivered straight to your door.</p>
                            <button className="bg-brand-green hover:bg-brand-dark text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-1 flex items-center gap-2 group animate-in zoom-in duration-1000 font-normal border border-green-400/30">
                                Discover Freshness <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
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
