import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import Newsletter from '../component/Newsletter';
import Footer from '../component/Footer';

const Newarrivals = () => {
  const [newArrival, setNewArrival] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    arrival();
  }, []);

  const arrival = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/category/Tops');
      setNewArrival(response.data.products);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  }

  const handleProductClick = async (product) => {
    const productId = product.id;
    try {
      const response = await axiosInstance.post(`/return-product/${productId}`);
      if (response.data) {
        navigate(`/product/${productId}`);
      }
    } catch (error) {
      console.error("Failed to send selected product:", error);
      toast.error('Failed to fetch data');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 to-gray-900 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Express Your Style</h1>
          <p className="text-xl md:text-2xl mb-8">with the Perfect Outfit</p>
          <p className="max-w-2xl mx-auto text-lg">
            Explore our wide selection of carefully curated apparel, tailored to highlight your unique personality and complement your fashion preferences.
          </p>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">NEW ARRIVALS</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            View All
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="bg-gray-200 h-64 w-full"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : newArrival.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            <button
              onClick={arrival}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {newArrival.map((product, i) => (
              <div
                onClick={() => handleProductClick(product)}
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  {product?.images?.front ? (
                    <>
                      <img
                        src={product.images.front}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </>
                  ) : (
                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-400">Image not available</p>
                    </div>
                  )}
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 text-sm line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-500 text-xs ml-1">({product.reviewCount || 0})</span>
                  </div>
                  <button className="mt-3 w-full py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Enjoy Special Discounts and Offers</h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            Discover our latest collection of exclusive products! Enjoy special discounts and offers tailored just for you.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium">
            Shop Now
          </button>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Newarrivals;