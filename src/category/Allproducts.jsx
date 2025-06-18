import React from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import ProductSkeleton from "../hooks/ProductSkeleton";
import { useGetProducts } from "../hooks/product";


const Allproducts = () => {
  const navigate = useNavigate();

  const {data:allProducts, isLoading, isError} = useGetProducts();

  const handleClick = async (product) => {
    const productId = product.id;
    try {
      const response = await axiosInstance.post(`/return-product/${productId}`);
      if (response.data) {
        navigate(`/product/${productId}`);
      }
    } catch (error) {
    }
  };

  return (
    <>
      <h3 className="text-center text-4xl font-bold my-6">
        Explore Our Collection
      </h3>

      {isLoading ? (
        <ProductSkeleton />
      ) : allProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-5 gap-4 p-4 bg-gray-100">
          {allProducts.map((product, i) => (
            <div
              key={i}
              onClick={() => handleClick(product)}
              className="bg-white border cursor-pointer border-gray-200 rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow duration-300"
            >
              {product?.images?.front ? (
                <img
                  src={product.images.front}
                  alt={product?.name || "Product image"}
                  className="w-full h-40 object-cover hover:scale-110 transform transition duration-300 ease-in-out"
                />
              ) : (
                <p className="text-red-500 text-center">Image not available</p>
              )}

              <p className="text-center font-semibold mt-2">
                {product?.name || "Unnamed Product"}
              </p>
              <p className="text-center text-sm">
                ${product?.price ?? "N/A"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg font-semibold py-10">
          No products found.
        </p>
      )}
    </>

  );
};

export default Allproducts;
