import React, { useState, useEffect } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Eye,
  Clock,
  TrendingUp,
  Zap,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Newsletter from "../component/Newsletter";
import Footer from "../component/Footer";
import { Toaster, toast } from "sonner";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useGetOnsaleProducts, useGetProducts } from "../hooks/product";
import WelcomePopup from "../hooks/WelcomePopUp";
import OnsaleCarousel from "./OnsaleCarousel";
import Pagination from "../hooks/Pagination";

const OnSale = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("discount");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filteredProductsState, setFilteredProductsState] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const { data: products, isLoading, isFetching, isError } = useGetProducts();
  console.log(products);
  const {
    data: onsaleProducts,
    isLoading: isLoadingOnsale,
    isError: isErrorOnsale,
  } = useGetOnsaleProducts();

  // const categories = [
  //   { id: "all", name: "All Items", count: totalProducts },
  //   { id: "clothing", name: "Clothing", count: 0 },
  //   { id: "accessories", name: "Accessories", count: 0 },
  //   { id: "footwear", name: "Footwear", count: 0 },
  //   { id: "bags", name: "Bags", count: 0 },
  // ];

  // Pagination functions
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (products?.length) {
      // Extract unique categories from products
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ].map((category, index) => ({
        id: index + 1,
        category,
        count: products.filter((p) => p.category === category).length,
      }));
      setCategories(uniqueCategories);
      const filtered = applyFiltersAndSort(products, sortBy, selectedCategory);
      setFilteredProductsState(filtered);
    } else {
      setFilteredProductsState([]);
    }
  }, [products]);

  const applyFiltersAndSort = (products, sortBy, selectedCategory) => {
    let filtered = [...products];
    //   filtered = filtered.filter(product => {
    //   const price = product.promoPrice || product.price;
    //   return price >= priceRange[0] && price <= priceRange[1];
    // });
    if (selectedCategory === "New Arrival") {
      filtered = filtered.filter((product) => product.isNewArrival === true);
    } else if (selectedCategory === "Popular") {
      filtered = filtered.filter((product) => product.isPopular === true);
    } else if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (sortBy === "price-low") {
      filtered.sort(
        (a, b) => (a.promoPrice || a.price) - (b.promoPrice || b.price)
      );
    } else if (sortBy === "price-high") {
      filtered.sort(
        (a, b) => (b.promoPrice || b.price) - (a.promoPrice || a.price)
      );
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    return filtered;
  };

  const handleSortBy = (e) => {
    const value = e.target.value;
    setSortBy(value);
    const sortedFiltered = applyFiltersAndSort(
      products || [],
      value,
      selectedCategory
    );
    setFilteredProductsState(sortedFiltered);
    setCurrentPage(1);
  };

  const handleCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    const sortedFiltered = applyFiltersAndSort(
      products || [],
      sortBy,
      categoryName
    );
    setFilteredProductsState(sortedFiltered);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % onsaleProducts?.products?.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPage]);

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products?.length / productsPerPage);

  const ProductCard = ({ product }) => (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product?.images?.front || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isHot && (
            <div className="flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" />
              HOT DEAL
            </div>
          )}
          {product.originalPrice && (
            <div className="flex items-center bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </div>
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
      <div className="relative bg-gradient-to-r bg-pink-600 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Zap className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">MEGA SALE EVENT</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Limited-time offers on your favorite items. Prices slashed across
            all categories!
          </p>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">{totalProducts}+</div>
              <div className="text-sm opacity-90">Discounted Items</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Up to 70%</div>
              <div className="text-sm opacity-90">Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24h</div>
              <div className="text-sm opacity-90">Flash Deals</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Featured Deals</h2>
            <div className="flex gap-2">
              {onsaleProducts?.products?.length > 0 &&
                onsaleProducts?.products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? "bg-black" : "bg-gray-300"
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
              {onsaleProducts?.products?.length > 0 &&
                onsaleProducts?.products.map((product) => (
                  <OnsaleCarousel
                    product={product}
                    key={product.id}
                    handleProductClick={handleProductClick}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Filters and Categories */}
          <h4 className="font-semibold mb-4">Categories</h4>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategory("All Products")}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === "All Products"
                   ? "bg-black text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                <span>All Products</span>
                <span className="text-sm opacity-75">
                  ({products?.length || 0})
                </span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategory("popular")}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === "popular"
                   ? "bg-black text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                <span>Most Popular</span>
                <span className="text-sm opacity-75">
                  ({products?.filter((p) => p.isPopular)?.length || 0})
                </span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategory("newest")}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === "newest"
                   ? "bg-black text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                <span>New Arrivals</span>
                <span className="text-sm opacity-75">
                  ({products?.filter((p) => p.isNewArrival)?.length || 0})
                </span>
              </button>
            </div>
           
          </div>
          <div className="flex items-center gap-4">
            <select
              // value={sortBy}
              onChange={handleSortBy}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
              <option value="ending">Ending Soon</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {[...Array(productsPerPage)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200 w-full"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No sale products found in this category
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="cursor-pointer"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {/* {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-12">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstProduct + 1}-
                  {Math.min(indexOfLastProduct, products.length)} of{" "}
                  {products.length} products
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show pages around current page
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentPage === pageNumber
                              ? "bg-black text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="px-2 flex items-end">...</span>
                    )}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <button
                        onClick={() => paginate(totalPages)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentPage === totalPages
                            ? "bg-black text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {totalPages}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )} */}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              products={products}
              paginate={paginate}
              prevPage={prevPage}
              nextPage={nextPage}
              setCurrentPage={setCurrentPage}
              indexOfLastProduct={indexOfLastProduct}
              indexOfFirstProduct={indexOfFirstProduct}
              currentProducts={currentProducts}
            />
          </>
        )}

        {/* Flash Sale Banner */}
        <div className="bg-gradient-to-r from-red-700 to-orange-600 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl mb-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-yellow-300" />
              <h2 className="text-3xl font-bold">FLASH SALE COUNTDOWN</h2>
            </div>
            <p className="text-xl mb-6 max-w-3xl mx-auto opacity-90">
              These deals disappear in just a few hours! Don't miss your chance
              to save big.
            </p>
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="bg-white/20 px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm opacity-90">HOURS</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="bg-white/20 px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">45</div>
                <div className="text-sm opacity-90">MINUTES</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="bg-white/20 px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">30</div>
                <div className="text-sm opacity-90">SECONDS</div>
              </div>
            </div>
            <button className="px-8 py-4 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-colors text-lg">
              SHOP FLASH SALE NOW
            </button>
          </div>
        </div>
      </div>
      <WelcomePopup />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default OnSale;
