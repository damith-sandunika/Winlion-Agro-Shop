import React from 'react';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

// Dummy Data
const todaysPicks = [
    { id: 1, name: 'Fresh Tomatoes', price: 250, unit: 'kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80', discount: 10, reviewsCount: 120 },
    { id: 2, name: 'Fresh Carrots', price: 180, oldPrice: 200, unit: 'kg', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&q=80', discount: 0, reviewsCount: 85 },
    { id: 3, name: 'Green Beans', price: 220, unit: 'kg', image: 'https://images.unsplash.com/photo-1579899310860-252514bc7da4?auto=format&fit=crop&w=300&q=80', discount: 15, reviewsCount: 95 },
    { id: 4, name: 'Fresh Mangoes', price: 460, unit: 'kg', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80', discount: 0, reviewsCount: 50 },
    { id: 5, name: 'Spinach (Palak)', price: 120, unit: 'bundle', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80', discount: 0, reviewsCount: 76 },
    { id: 6, name: 'Fresh Bananas', price: 160, unit: 'kg', image: 'https://images.unsplash.com/photo-1571501478200-72061e3860bb?auto=format&fit=crop&w=300&q=80', discount: 0, reviewsCount: 110 }
];

const featuredProducts = [
    { id: 7, name: 'Red Onion', price: 200, unit: 'kg', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=300&q=80', discount: 0, reviewsCount: 60 },
    { id: 8, name: 'Potatoes', price: 150, unit: 'kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80', discount: 0, reviewsCount: 80 },
    { id: 9, name: 'Capsicum', price: 280, unit: 'kg', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa8a?auto=format&fit=crop&w=300&q=80', discount: 0, reviewsCount: 25 },
    { id: 10, name: 'Cucumber', price: 190, unit: 'kg', image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=300&q=80', discount: 0, reviewsCount: 45 },
    { id: 11, name: 'Brinjal', price: 220, unit: 'kg', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&q=80', discount: 0, reviewsCount: 55 },
    { id: 12, name: 'Green Chillies', price: 160, unit: 'kg', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&q=80', discount: 0, reviewsCount: 35 }
];

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main>
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <HeroSlider />
                </div>
                
                <CategoryGrid />
                
                <ProductGrid 
                    title="Today's Fresh Picks" 
                    products={todaysPicks} 
                    icon="🌱"
                />

                {/* Promotional Banner */}
                <section className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
                    <div className="bg-brand-light rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between overflow-hidden relative border border-green-100">
                        <div className="md:w-1/2 z-10">
                            <span className="text-brand-green font-bold text-sm tracking-wider uppercase mb-2 block">Special Offer</span>
                            <h2 className="text-4xl font-bold text-gray-800 mb-2">20% OFF</h2>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-4">ON ORGANIC FRUITS</h3>
                            <p className="text-gray-600 mb-6">Limited time offer. Shop now and enjoy the freshness!</p>
                            <button className="bg-brand-green hover:bg-brand-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                Shop Now &rarr;
                            </button>
                        </div>
                        <div className="md:w-1/2 relative mt-8 md:mt-0 flex justify-end z-10">
                            <img 
                                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80" 
                                alt="Organic Fruits" 
                                className="w-80 h-auto object-contain drop-shadow-xl"
                            />
                            <div className="absolute top-0 right-0 bg-brand-green text-white w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold text-xl leading-none rotate-12 shadow-lg">
                                <span>100%</span>
                                <span className="text-sm">ORGANIC</span>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green rounded-l-full opacity-10 z-0 scale-150 translate-x-1/4"></div>
                    </div>
                </section>

                <ProductGrid 
                    title="Featured Products" 
                    products={featuredProducts} 
                    icon="🌿"
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
