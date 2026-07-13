import React from 'react';

const Features = () => {
    return (
        <section className="py-10 max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Why Choose Win Lion Agro Products?</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-brand-green text-2xl mb-4">
                        🌿
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">Farm Fresh</h4>
                    <p className="text-sm text-gray-500">Direct from Farmers</p>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-brand-green text-2xl mb-4">
                        🚚
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">Fast Delivery</h4>
                    <p className="text-sm text-gray-500">On Time Delivery</p>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-brand-green text-2xl mb-4">
                        🛡️
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">Secure Payment</h4>
                    <p className="text-sm text-gray-500">100% Safe</p>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-brand-green text-2xl mb-4">
                        ⭐
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">Premium Quality</h4>
                    <p className="text-sm text-gray-500">100% Safe Payment</p>
                </div>
            </div>
        </section>
    );
};

export default Features;
