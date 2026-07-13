import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        text: "Very fresh vegetables and fruits. Always on time delivery. Very satisfied with their service.",
        author: "Nimal Perera",
        location: "Colombo",
        avatar: "https://i.pravatar.cc/150?u=1",
        rating: 5
    },
    {
        id: 2,
        text: "Best quality products I have ever bought online. Highly recommended!",
        author: "Kavindi Silva",
        location: "Gampaha",
        avatar: "https://i.pravatar.cc/150?u=2",
        rating: 5
    },
    {
        id: 3,
        text: "Good packaging and super fast delivery. Will definitely order again.",
        author: "Chaminda Jayasinghe",
        location: "Kalutara",
        avatar: "https://i.pravatar.cc/150?u=3",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section className="py-10 max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-2xl font-bold text-gray-800">What Our Customers Say</h3>
                <span className="text-green-500">🌱</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex text-yellow-400 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} size={16} className="fill-current" />
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                            "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-3 mt-auto">
                            <img src={testimonial.avatar} alt={testimonial.author} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">{testimonial.author}</h4>
                                <p className="text-xs text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
