import React from 'react';
import { Sprout, Truck, ShieldCheck, Award } from 'lucide-react';

const Features = () => {
    return (
        <section className="py-10 max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-2xl font-normal text-gray-800">Why Choose Win Lion Agro Products?</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:shadow-[0_8px_30px_rgba(21,128,61,0.12)] transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-brand-green mb-4 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                        <Sprout size={28} strokeWidth={2.5} />
                    </div>
                    <h4 className="font-normal text-gray-800 mb-1">Farm Fresh</h4>
                    <p className="text-sm text-gray-500">Direct from Farmers</p>
                </div>
                
                <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:shadow-[0_8px_30px_rgba(21,128,61,0.12)] transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-brand-green mb-4 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                        <Truck size={28} strokeWidth={2.5} />
                    </div>
                    <h4 className="font-normal text-gray-800 mb-1">Fast Delivery</h4>
                    <p className="text-sm text-gray-500">On Time Delivery</p>
                </div>
                
                <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:shadow-[0_8px_30px_rgba(21,128,61,0.12)] transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-brand-green mb-4 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                        <ShieldCheck size={28} strokeWidth={2.5} />
                    </div>
                    <h4 className="font-normal text-gray-800 mb-1">Secure Payment</h4>
                    <p className="text-sm text-gray-500">100% Safe</p>
                </div>
                
                <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:shadow-[0_8px_30px_rgba(21,128,61,0.12)] transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-brand-green mb-4 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                        <Award size={28} strokeWidth={2.5} />
                    </div>
                    <h4 className="font-normal text-gray-800 mb-1">Premium Quality</h4>
                    <p className="text-sm text-gray-500">100% Safe Payment</p>
                </div>
            </div>
        </section>
    );
};

export default Features;
