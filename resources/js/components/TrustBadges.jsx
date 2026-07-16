import React from 'react';
import { ShieldCheck, Leaf, HeartHandshake, BadgeCheck } from 'lucide-react';

const TrustBadges = () => {
    return (
        <section className="py-12 border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <Leaf size={40} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">100% Organic</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <ShieldCheck size={40} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Quality Assured</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <BadgeCheck size={40} className="text-gray-400 group-hover:text-amber-500 transition-colors" />
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Certified Farms</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 group cursor-default">
                        <HeartHandshake size={40} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Happy Customers</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
