import React from 'react';
import { Sprout, Truck, ShieldCheck, Award } from 'lucide-react';

const Features = () => {
    return (
        <section className="py-8 md:py-16 max-w-7xl mx-auto px-4 lg:px-6">
            <div className="bg-white md:bg-green-50/50 rounded-3xl p-6 md:p-10 border border-green-100/50 shadow-sm">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-x-0 lg:divide-x divide-gray-100">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 lg:px-6 first:pl-0 group cursor-pointer">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-100/60 flex items-center justify-center text-brand-green flex-shrink-0 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                            <Sprout size={24} strokeWidth={2} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-0.5 text-sm md:text-base">Direct from Farmers</h4>
                            <p className="text-[11px] md:text-xs text-gray-500">Farm Fresh Products</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 lg:px-6 group cursor-pointer">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-100/60 flex items-center justify-center text-brand-green flex-shrink-0 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                            <Truck size={24} strokeWidth={2} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-0.5 text-sm md:text-base">Fast Delivery</h4>
                            <p className="text-[11px] md:text-xs text-gray-500">On Time Delivery</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 lg:px-6 group cursor-pointer">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-100/60 flex items-center justify-center text-brand-green flex-shrink-0 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                            <ShieldCheck size={24} strokeWidth={2} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-0.5 text-sm md:text-base">Secure Payment</h4>
                            <p className="text-[11px] md:text-xs text-gray-500">100% Safe</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 lg:px-6 last:pr-0 group cursor-pointer">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-100/60 flex items-center justify-center text-brand-green flex-shrink-0 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                            <Award size={24} strokeWidth={2} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-0.5 text-sm md:text-base">Premium Quality</h4>
                            <p className="text-[11px] md:text-xs text-gray-500">100% Safe Payment</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
