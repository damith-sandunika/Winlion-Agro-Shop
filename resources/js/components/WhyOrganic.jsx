import React from 'react';
import { CheckCircle2, Leaf, HeartPulse, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyOrganic = () => {
    return (
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 lg:px-6 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                
                {/* Image Side with Decorative Elements */}
                <div className="w-full lg:w-1/2 relative">
                    <div className="absolute top-[-30px] left-[-30px] w-48 h-48 bg-brand-green/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-[-30px] right-[-30px] w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl"></div>
                    
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(21,128,61,0.15)] group">
                        <img 
                            src="/images/sliders/new.png" 
                            alt="Fresh Organic Vegetables" 
                            className="w-full h-[400px] md:h-[550px] object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Floating Badge */}
                        <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                                <Leaf size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm md:text-base">100% Organic</h4>
                                <p className="text-xs text-gray-500">Certified Products</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-2 mb-4">
                        <Leaf className="text-brand-green w-5 h-5" />
                        <span className="text-brand-green font-medium tracking-widest uppercase text-sm">Health is Wealth</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight tracking-tight">
                        Why Choose Our Organic Products?
                    </h2>
                    <p className="text-gray-600 mb-10 text-base md:text-lg leading-relaxed">
                        We believe in nature's purest forms. Our agro products are grown without synthetic pesticides or harmful fertilizers, ensuring that you and your family consume only the safest, most nutritious food possible.
                    </p>

                    <div className="space-y-6 mb-10">
                        <div className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex flex-shrink-0 items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                                <HeartPulse size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-lg mb-1">Boosts Immunity & Health</h4>
                                <p className="text-gray-500 text-sm md:text-base leading-relaxed">Organic foods are richer in essential nutrients, antioxidants, and vitamins that naturally strengthen your immune system.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex flex-shrink-0 items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-lg mb-1">Zero Harmful Chemicals</h4>
                                <p className="text-gray-500 text-sm md:text-base leading-relaxed">Cultivated with traditional methods that eliminate the risk of ingesting toxic pesticide residues.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex flex-shrink-0 items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-lg mb-1">Better Taste & Freshness</h4>
                                <p className="text-gray-500 text-sm md:text-base leading-relaxed">Harvested at peak ripeness and delivered directly to your door, preserving the true natural flavor.</p>
                            </div>
                        </div>
                    </div>

                    <Link 
                        to="/about" 
                        className="inline-block bg-white border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 shadow-[0_4px_15px_rgba(21,128,61,0.1)] hover:shadow-[0_8px_25px_rgba(21,128,61,0.2)] hover:-translate-y-1"
                    >
                        Learn More About Us
                    </Link>
                </div>
                
            </div>
        </section>
    );
};

export default WhyOrganic;
