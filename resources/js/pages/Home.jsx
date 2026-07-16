import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sprout, Leaf, Tag, ShoppingCart } from 'lucide-react';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import Features from '../components/Features';
import ParallaxBanner from '../components/ParallaxBanner';
import Testimonials from '../components/Testimonials';
import WhyOrganic from '../components/WhyOrganic';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

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
                
                <ScrollReveal direction="up" delay={100}>
                    <CategoryGrid />
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                    <ProductGrid 
                        title="Today's Fresh Picks" 
                        products={todaysPicks} 
                        icon={<Sprout className="text-brand-green w-6 h-6 animate-bounce" />}
                    />
                </ScrollReveal>

                <ScrollReveal direction="none" delay={0}>
                    <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
                        <div 
                            className="rounded-[2rem] p-10 md:p-14 flex flex-col justify-center overflow-hidden relative shadow-lg min-h-[400px] border border-green-200/50 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80')" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a14]/90 via-[#1a3a14]/60 to-transparent"></div>
                            <div className="z-10 relative max-w-xl text-white">
                                <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs tracking-widest uppercase mb-3 md:mb-4 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/30 font-normal">
                                    <Tag size={12} className="md:w-3.5 md:h-3.5" /> Fresh Arrival
                                </span>
                                <h2 className="text-lg md:text-2xl mb-1 md:mb-2 tracking-tight font-normal text-white drop-shadow-md">Farm Fresh Organic</h2>
                                <h3 className="text-xl md:text-2xl mb-3 md:mb-4 tracking-wide font-normal text-green-100 drop-shadow-sm leading-snug">HANDPICKED FOR YOU</h3>
                                <p className="mb-6 md:mb-8 text-[13px] md:text-xl max-w-md font-light text-white/90 leading-relaxed">Experience the true taste of nature. Premium quality fruits and vegetables delivered straight to your door.</p>
                                <button className="bg-brand-green hover:bg-brand-dark text-white px-5 py-2.5 md:px-8 md:py-4 rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-1 flex items-center gap-2 group font-normal border border-green-400/30 text-[13px] md:text-base">
                                    Discover Freshness <ShoppingCart size={16} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                    <ProductGrid 
                        title="Featured Products" 
                        products={featuredProducts} 
                        icon={<Leaf className="text-brand-green w-6 h-6 animate-pulse" />}
                    />
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                    <WhyOrganic />
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                    <Features />
                </ScrollReveal>
                
                <ScrollReveal direction="none" delay={0}>
                    <ParallaxBanner />
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={100}>
                    <Testimonials />
                </ScrollReveal>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
