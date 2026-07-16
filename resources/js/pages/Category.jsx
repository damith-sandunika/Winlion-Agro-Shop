import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Leaf, Search } from 'lucide-react';

const Category = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Scroll to top on load
        window.scrollTo(0, 0);
        setLoading(true);
        
        // In a real scenario, this would fetch from an API like:
        // axios.get(`/api/public/categories/${id}/products`)
        
        // Mocking API call for now
        axios.get('/api/public/products')
            .then(res => {
                // Formatting data exactly like Home.jsx
                const formatted = res.data.map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.discount_price || p.selling_price,
                    oldPrice: p.discount_price ? p.selling_price : null,
                    discount: p.discount_price ? Math.round(((p.selling_price - p.discount_price) / p.selling_price) * 100) : 0,
                    unit: p.unit_type || 'kg',
                    image: p.images && p.images.length > 0 ? `/storage/${p.images[0]}` : 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80',
                    reviewsCount: Math.floor(Math.random() * 100) + 10,
                    description: p.description
                }));
                
                // Simulate category specific data
                const titles = {
                    '1': 'Fresh Fruits',
                    '2': 'Organic Vegetables',
                    '3': 'Seeds & Plants',
                    '4': 'Fertilizers',
                    'fruits': 'Fresh Fruits',
                    'vegetables': 'Organic Vegetables'
                };
                
                setCategory({
                    id: id,
                    name: titles[id] || 'Explore Category',
                    description: 'Discover the freshest, handpicked items sourced directly from local organic farms.',
                    banner: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1600&q=80'
                });
                
                // Just randomize products for demo
                setProducts(formatted.sort(() => 0.5 - Math.random()).slice(0, 12));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Category Banner */}
                {category && (
                    <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden bg-brand-dark">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
                        <img 
                            src={category.banner} 
                            alt={category.name} 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 z-20 flex flex-col justify-center max-w-7xl mx-auto px-4 lg:px-6">
                            <div className="flex items-center gap-2 text-brand-green mb-3">
                                <Leaf size={16} />
                                <span className="text-sm font-medium tracking-widest uppercase">Premium Quality</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
                                {category.name}
                            </h1>
                            <p className="text-gray-200 text-sm md:text-base max-w-xl leading-relaxed font-light">
                                {category.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* Content area */}
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 md:py-16">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 font-medium">
                            Showing <span className="text-gray-900">{products.length}</span> results for <span className="text-gray-900">{category?.name}</span>
                        </p>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <select className="bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-700 py-2.5 px-4 focus:ring-2 focus:ring-brand-green outline-none cursor-pointer w-full md:w-48">
                                <option>Sort by Default</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest First</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {!loading && products.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 mb-6">We couldn't find any products in this category right now.</p>
                            <Link to="/" className="inline-block bg-brand-green text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-dark transition-colors">
                                Return to Home
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Category;
