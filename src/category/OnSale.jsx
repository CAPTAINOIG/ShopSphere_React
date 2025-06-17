import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, Star, Eye, ArrowRight, Clock, TrendingUp, Sparkles, Filter } from 'lucide-react';
import Newsletter from '../component/Newsletter';
import Footer from '../component/Footer';

const OnSale = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('newest');
    const [timeFilter, setTimeFilter] = useState('all');
    const [currentSlide, setCurrentSlide] = useState(0);

    const categories = [
        { id: 'all', name: 'All New Items', count: 156 },
        { id: 'clothing', name: 'Clothing', count: 89 },
        { id: 'accessories', name: 'Accessories', count: 34 },
        { id: 'shoes', name: 'Shoes', count: 23 },
        { id: 'bags', name: 'Bags', count: 10 }
    ];

    const timeFilters = [
        { id: 'all', name: 'All Time', period: '' },
        { id: 'today', name: 'Today', period: 'Last 24 hours' },
        { id: 'week', name: 'This Week', period: 'Last 7 days' },
        { id: 'month', name: 'This Month', period: 'Last 30 days' }
    ];

    const featuredProducts = [
        {
            id: 1,
            name: 'Aurora Silk Blouse',
            brand: 'LUXE COLLECTION',
            price: 189,
            originalPrice: 250,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop',
            rating: 4.9,
            reviews: 23,
            arrivalDate: '2024-06-15',
            isHot: true,
            description: 'Ethereal silk blouse with delicate pearl details'
        },
        {
            id: 2,
            name: 'Neo-Classic Blazer',
            brand: 'MODERN EDGE',
            price: 345,
            originalPrice: null,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
            rating: 4.8,
            reviews: 15,
            arrivalDate: '2024-06-14',
            isHot: false,
            description: 'Contemporary blazer with architectural lines'
        },
        {
            id: 3,
            name: 'Midnight Velvet Dress',
            brand: 'EVENING LUXE',
            price: 420,
            originalPrice: null,
            image: 'https://images.unsplash.com/photo-1566479179817-c8d3dc5b9e12?w=600&h=800&fit=crop',
            rating: 5.0,
            reviews: 8,
            arrivalDate: '2024-06-13',
            isHot: true,
            description: 'Luxurious velvet dress for special occasions'
        }
    ];

    const newArrivals = [
        {
            id: 4,
            name: 'Minimalist Cotton Tee',
            brand: 'BASICS+',
            price: 78,
            originalPrice: 95,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
            rating: 4.7,
            reviews: 45,
            arrivalDate: '2024-06-16',
            category: 'clothing',
            colors: ['white', 'black', 'gray', 'navy'],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            isJustIn: true
        },
        {
            id: 5,
            name: 'Artisan Leather Bag',
            brand: 'CRAFT STUDIO',
            price: 289,
            originalPrice: null,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
            rating: 4.9,
            reviews: 12,
            arrivalDate: '2024-06-15',
            category: 'bags',
            colors: ['brown', 'black', 'tan'],
            sizes: ['One Size'],
            isJustIn: false
        },
        {
            id: 6,
            name: 'Urban Runner Sneakers',
            brand: 'STREET PULSE',
            price: 156,
            originalPrice: 180,
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
            rating: 4.6,
            reviews: 67,
            arrivalDate: '2024-06-14',
            category: 'shoes',
            colors: ['white', 'black', 'blue'],
            sizes: ['7', '8', '9', '10', '11', '12'],
            isJustIn: true
        },
        {
            id: 7,
            name: 'Gold Chain Necklace',
            brand: 'FINE JEWELRY CO',
            price: 234,
            originalPrice: null,
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop',
            rating: 4.8,
            reviews: 28,
            arrivalDate: '2024-06-13',
            category: 'accessories',
            colors: ['gold', 'silver'],
            sizes: ['18"', '20"', '22"'],
            isJustIn: false
        },
        {
            id: 8,
            name: 'Vintage Denim Jacket',
            brand: 'RETRO REVIVAL',
            price: 198,
            originalPrice: 240,
            image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop',
            rating: 4.5,
            reviews: 89,
            arrivalDate: '2024-06-12',
            category: 'clothing',
            colors: ['blue', 'black', 'white'],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            isJustIn: false
        },
        {
            id: 9,
            name: 'Crystal Drop Earrings',
            brand: 'SPARKLE & CO',
            price: 89,
            originalPrice: 120,
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop',
            rating: 4.9,
            reviews: 34,
            arrivalDate: '2024-06-11',
            category: 'accessories',
            colors: ['clear', 'blue', 'pink'],
            sizes: ['One Size'],
            isJustIn: true
        }
    ];

    const filteredProducts = newArrivals.filter(product => {
        if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
        return true;
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const ProductCard = ({ product, featured = false }) => (
        <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${featured ? 'h-96' : ''}`}>
            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${featured ? 'h-64' : 'h-80'}`}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isJustIn && (
                        <div className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            <Sparkles className="w-3 h-3 mr-1" />
                            JUST IN
                        </div>
                    )}
                    {product.isHot && (
                        <div className="flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            HOT
                        </div>
                    )}
                    {product.originalPrice && (
                        <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                        <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                </div>

                {/* Quick Add */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-full bg-black/90 backdrop-blur-sm text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Quick Add
                    </button>
                </div>

                {/* Arrival Date */}
                <div className="absolute bottom-4 left-4 opacity-75">
                    <div className="flex items-center text-white text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(product.arrivalDate).toLocaleDateString()}
                    </div>
                </div>
            </div>

            <div className={`p-6 ${featured ? 'p-4' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                <h3 className={`font-semibold text-gray-900 mb-2 ${featured ? 'text-lg' : ''}`}>{product.name}</h3>

                {featured && product.description && (
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                )}

                <div className="flex items-center gap-2 mb-3">
                    <span className={`font-bold text-gray-900 ${featured ? 'text-xl' : 'text-lg'}`}>${product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                </div>

                {!featured && (
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                            {product.colors?.slice(0, 3).map((color, index) => (
                                <div
                                    key={index}
                                    className="w-4 h-4 rounded-full border-2 border-gray-200"
                                    style={{ backgroundColor: color === 'white' ? '#ffffff' : color }}
                                />
                            ))}
                            {product.colors?.length > 3 && (
                                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                            )}
                        </div>
                        <span className="text-sm text-gray-500">{product.sizes?.length} sizes</span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-gray-900">New Arrivals</span>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 mb-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-8 h-8" />
                            <h1 className="text-5xl font-bold">New Arrivals</h1>
                        </div>
                        <p className="text-xl mb-8 max-w-2xl opacity-90">
                            Discover the latest trends and fresh styles that just landed in our collection. Be the first to wear what's next.
                        </p>
                        <div className="flex gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold">156</div>
                                <div className="text-sm opacity-75">New Items</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">24h</div>
                                <div className="text-sm opacity-75">Fresh Updates</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">100%</div>
                                <div className="text-sm opacity-75">Latest Trends</div>
                            </div>
                        </div>
                    </div>
                    {/* Animated background elements */}
                    <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-10 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-75"></div>
                    <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-150"></div>
                </div>

                {/* Featured Arrivals Carousel */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold">Featured This Week</h2>
                        <div className="flex gap-2">
                            {featuredProducts.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-black' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {featuredProducts.map((product) => (
                                <div key={product.id} className="w-full flex-shrink-0">
                                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-3xl">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                            <div>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Sparkles className="w-6 h-6 text-purple-600" />
                                                    <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Featured Arrival</span>
                                                </div>
                                                <h3 className="text-4xl font-bold mb-4">{product.name}</h3>
                                                <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="flex items-center gap-2">
                                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                        <span className="font-semibold">{product.rating}</span>
                                                        <span className="text-gray-500">({product.reviews} reviews)</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 mb-8">
                                                    <span className="text-3xl font-bold">${product.price}</span>
                                                    {product.originalPrice && (
                                                        <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                                                    )}
                                                </div>
                                                <div className="flex gap-4">
                                                    <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
                                                        <ShoppingCart className="w-5 h-5" />
                                                        Add to Cart
                                                    </button>
                                                    <button className="border-2 border-black text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                                />
                                                {product.isHot && (
                                                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold">
                                                        🔥 TRENDING
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filters and Categories */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all ${selectedCategory === category.id
                                        ? 'bg-black text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                                    }`}
                            >
                                {category.name} ({category.count})
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <select
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                {timeFilters.map(filter => (
                                    <option key={filter.id} value={filter.id}>{filter.name}</option>
                                ))}
                            </select>
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="popular">Most Popular</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* <div className="flex lg:flex-row md:flex-col flex-col justify-between mt-4 items-center">
                    <div
                        className={`${currentPage === 1 ? "text-gray-400" : "text-green-700"
                          }`}
                      >
                        showing page {currentPage} of {totalItems}
                      </div>
                    <div>
                        Showing 50 page of 100
                    </div>
                    <div className="flex gap-3 items-center">
                        <div>
                            <button
                                onClick={handlePreviousPage}
                            // disabled={currentPage === 1}
                            >
                                <div className="flex items-center gap-1 mt-2">
                                    <IoIosArrowDropleft className="mt-1" />
                                    <span>Previous</span>
                                </div>
                            </button>
                        </div>

                        <div>
                            <button
                                onClick={handleNextPage}
                            // disabled={currentPage === totalItems}
                            >
                                <div className="flex items-center gap-1 mt-1">
                                    <span>Next</span>
                                    <IoIosArrowDropright className="mt-1" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div> */}
                <Newsletter />
                <Footer />
            </div>
        </div>
    );
};

export default OnSale;