import React, { useState, useEffect } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  Eye,
  ArrowRight,
  Clock,
  TrendingUp,
  Zap,
  Filter,
} from "lucide-react";
import Newsletter from "../component/Newsletter";
import Footer from "../component/Footer";
import { toast, Toaster } from "sonner";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useGetProducts } from "../hooks/product";

const OnSale = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("discount");
  const [timeFilter, setTimeFilter] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const { data: products, isLoading, isFetching, isError } = useGetProducts();

  const categories = [
    { id: "all", name: "All Items", count: 156 },
    { id: "clothing", name: "Clothing", count: 89 },
    { id: "accessories", name: "Accessories", count: 34 },
    { id: "footwear", name: "Footwear", count: 23 },
    { id: "bags", name: "Bags", count: 10 },
  ];

  const timeFilters = [
    { id: "all", name: "All Time", period: "" },
    { id: "today", name: "Today", period: "Last 24 hours" },
    { id: "week", name: "This Week", period: "Last 7 days" },
    { id: "month", name: "This Month", period: "Last 30 days" },
  ];

  useEffect(() => {
    fetchSaleProducts();
  }, [selectedCategory, sortBy]);

  const fetchSaleProducts = async () => {
    try {
      // setIsLoading(true);
      let endpoint = "/products/on-sale";
      if (selectedCategory !== "all") {
        endpoint += `?category=${selectedCategory}`;
      }
      if (sortBy) {
        endpoint += `${selectedCategory !== "all" ? "&" : "?"}sort=${sortBy}`;
      }

      const response = await axiosInstance.get(endpoint);
      console.log(response);
      setSaleProducts(response.data.products);
    } catch (error) {
      toast.error("Failed to fetch sale products");
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleProductClick = async (product) => {
    const productId = product.id;
    try {
      const response = await axiosInstance.post(`/return-product/${productId}`);
      if (response.data) {
        navigate(`/product/${productId}`);
      }
    } catch (error) {
      console.error("Failed to send selected product:", error);
      toast.error("Failed to fetch product details");
    }
  };

  const ProductCard = ({ product }) => (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={product?.images?.front || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            -
            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100,
              2
            )}
            %
          </div>
        )}

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
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle add to cart
            }}
            className="w-full bg-black/90 backdrop-blur-sm text-white py-2 rounded-lg font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating || "4.5"}</span>
          <span className="text-sm text-gray-500">
            ({product.reviewCount || "24"})
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{product.brand || "Brand"}</p>

        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {product.timeLeft && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-red-500">
              <Clock className="w-3 h-3" />
              <span>Sale ends in {product.timeLeft}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-orange-500 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Zap className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">HOT DEALS</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Limited-time offers on your favorite items. Don't miss out on these
            incredible savings!
          </p>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">{saleProducts.length}+</div>
              <div className="text-sm opacity-90">Items On Sale</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Up to 70%</div>
              <div className="text-sm opacity-90">Discounts</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24h</div>
              <div className="text-sm opacity-90">Flash Sales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                {timeFilters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.name}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="bg-gray-200 h-64 w-full"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No sale products found</p>
            <button
              onClick={fetchSaleProducts}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div
                key={i}
                onClick={() => handleProductClick(product)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Flash Sale Banner */}
      <div className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-orange-400" />
            <h2 className="text-3xl font-bold">FLASH SALE</h2>
          </div>
          <p className="text-xl mb-6 max-w-3xl mx-auto opacity-90">
            Limited-time offers ending soon! Get these deals before they're
            gone.
          </p>
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs opacity-75">HOURS</div>
            </div>
            <div className="text-xl">:</div>
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold">45</div>
              <div className="text-xs opacity-75">MINUTES</div>
            </div>
            <div className="text-xl">:</div>
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold">30</div>
              <div className="text-xs opacity-75">SECONDS</div>
            </div>
          </div>
          <button className="px-8 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors">
            SHOP FLASH SALE
          </button>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default OnSale;
