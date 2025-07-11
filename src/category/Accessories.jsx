import React from 'react'
import { useGetCategoryAccessoriesProducts } from '../hooks/product';
import axiosInstance from '../axiosInstance';
import {useNavigate } from 'react-router-dom';

const Accessories = () => {
    const navigate = useNavigate();
    const {data: accessoriesCategory, isLoading, isError} = useGetCategoryAccessoriesProducts();


    const handleProductClick = async (product) => {
      const productId = product.id
      try {
        const response = await axiosInstance.post(`/return-product/${productId}`);
        if (response.data) {
          navigate(`/product/${productId}`);
        }
      } catch (error) {
        console.error("Failed to send selected product:", error);
      }
    }

  return (
    <div>
        <h3 className='text-center text-4xl my-3 font-bold'>Accessories</h3>
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
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {accessoriesCategory.products?.length > 0 && accessoriesCategory.products.map((product, i) => (
              <div
                onClick={() => handleProductClick(product)}
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                {product?.images && product?.images?.front ? (
                  <img
                    src={product?.images?.front}
                    alt={product?.name}
                    className="w-full h-40 object-cover hover:transform hover:scale-110 transition duration-300 ease-in-out"
                  />
                ) : (
                  <p className="text-red-500">Image not available</p>
                )}
                <p className="text-center font-semibold mt-2">{product?.name}</p>
                <p className="text-center text-sm">${product?.price}</p>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default Accessories