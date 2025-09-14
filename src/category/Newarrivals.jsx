import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import Newsletter from "../component/Newsletter";
import Footer from "../component/Footer";
import { useGetNewArrivalsProducts } from "../hooks/product";
import ShopProductCard from "./ShopProductCard";

const Newarrivals = () => {
  // const [newArrival, setNewArrival] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { data: newArrival, isLoading, isError } = useGetNewArrivalsProducts();
  console.log(newArrival);
  // useEffect(() => {
  //   arrival();
  // }, []);

  // const arrival = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axiosInstance.get('/category/Tops');
  //     console.log(response.data.products);
  //     setNewArrival(response.data.products);
  //   } catch (error) {
  //     toast.error('Failed to fetch data');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  const handleProductClick = async (product) => {
    const productId = product.id;
    try {
      const response = await axiosInstance.post(`/return-product/${productId}`);
      if (response.data) {
        navigate(`/product/${productId}`);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      <div className="relative bg-gradient-to-r from-indigo-500 to-gray-900 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Express Your Style
          </h1>
          <p className="text-xl md:text-2xl mb-8">with the Perfect Outfit</p>
          <p className="max-w-2xl mx-auto text-lg">
            Explore our wide selection of carefully curated apparel, tailored to
            highlight your unique personality and complement your fashion
            preferences.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">NEW ARRIVALS</h2>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            View All
          </button>
        </div>

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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {newArrival.products.map((product, i) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Enjoy Special Discounts and Offers
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            Discover our latest collection of exclusive products! Enjoy special
            discounts and offers tailored just for you.
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            Shop Now
          </button>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Newarrivals;
