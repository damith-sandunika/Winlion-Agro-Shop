import React, { useState } from 'react';
import { Star, X, Send, Sparkles } from 'lucide-react';

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
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [localTestimonials, setLocalTestimonials] = useState(testimonials);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newReview = {
            id: Date.now(),
            text: formData.get('review'),
            author: formData.get('name'),
            location: 'Sri Lanka',
            avatar: 'https://ui-avatars.com/api/?name=' + formData.get('name') + '&background=random',
            rating: 5
        };
        setLocalTestimonials([newReview, ...localTestimonials].slice(0, 3));
        setIsFormOpen(false);
    };

    return (
        <section className="py-16 md:py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="text-brand-green w-5 h-5 animate-pulse" />
                            <span className="text-brand-green text-sm font-semibold tracking-wider uppercase">Testimonials</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tight">What Our Customers Say</h3>
                    </div>
                    <button 
                        onClick={() => setIsFormOpen(true)}
                        className="bg-brand-green text-white hover:bg-brand-dark px-6 py-2.5 rounded-xl font-normal transition-colors duration-300 shadow-sm flex items-center gap-2"
                    >
                        Write a Review
                    </button>
                </div>
            
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {localTestimonials.map(testimonial => (
                        <div key={testimonial.id} className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(21,128,61,0.06)] transition-all duration-500 hover:-translate-y-2 relative group border border-gray-100/50">
                            <div className="absolute top-8 right-8 text-green-100/40 group-hover:text-green-100 transition-colors duration-300">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.017 21L16.41 14.904C16.5919 14.4716 16.6853 14.0041 16.684 13.528V3H23.957V13.528L21.564 21H14.017ZM0 21L2.393 14.904C2.57494 14.4716 2.66826 14.0041 2.667 13.528V3H9.94V13.528L7.547 21H0Z" />
                                </svg>
                            </div>
                            
                            <div className="flex text-amber-400 mb-6 gap-1 relative z-10">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-current drop-shadow-sm" />
                                ))}
                            </div>
                            
                            <p className="text-gray-600 text-[15px] md:text-base mb-8 line-clamp-4 leading-relaxed relative z-10 font-normal">
                                "{testimonial.text}"
                            </p>
                            
                            <div className="flex items-center gap-4 mt-auto relative z-10 pt-2">
                                <img src={testimonial.avatar} alt={testimonial.author} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-[15px]">{testimonial.author}</h4>
                                    <p className="text-xs text-brand-green font-medium mt-0.5">{testimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100">
                            <h3 className="text-xl font-normal text-gray-800">Write a Review</h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-normal text-gray-700 mb-1">Your Name</label>
                                <input type="text" name="name" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all" placeholder="Enter your name" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-normal text-gray-700 mb-1">Rating</label>
                                <div className="flex gap-2 text-amber-400">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={24} className="fill-current cursor-pointer hover:scale-110 transition-transform" />)}
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-normal text-gray-700 mb-1">Your Review</label>
                                <textarea name="review" required rows="4" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all resize-none" placeholder="Share your experience with us..."></textarea>
                            </div>
                            <button type="submit" className="w-full bg-brand-green hover:bg-brand-dark text-white font-normal py-3 rounded-xl transition-all shadow-md flex justify-center items-center gap-2">
                                Submit Review <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Testimonials;
