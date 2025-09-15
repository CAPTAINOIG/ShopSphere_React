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
import { useGetOnsaleProducts, useGetProducts, usePostProductClick } from "../hooks/product";
import WelcomePopup from "../hooks/WelcomePopup";
import OnsaleCarousel from "./OnsaleCarousel";
import Pagination from "../hooks/Pagination";
import OnsaleProduct from "./OnsaleProduct";

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
  const { mutateAsync: postProductClick } = usePostProductClick();
  
  const {
    data: onsaleProducts,
    isLoading: isLoadingOnsale,
    isError: isErrorOnsale,
  } = useGetOnsaleProducts();

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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % onsaleProducts?.products?.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPage]);

 
   const handleProductClick = async (product) => {
     try {
       const response = await postProductClick({ productId: product.id });
       navigate(`/product/${product.id}`);
       window.scrollTo({ top: 0, behavior: "smooth" });
     } catch (error) {
       toast.error(error.message);
     }
   };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products?.length / productsPerPage);

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
      <div className="px-4 sm:px-6 lg:px-8 py-12">
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
                  <OnsaleProduct product={product} />
                </div>
              ))}
            </div>

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

        <div className="bg-pink-700 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl mb-12">
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
