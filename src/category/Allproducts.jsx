import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import gif from "../assets/image/gif.gif";
import ProductSkeleton from "../hooks/ProductSkeleton";

// baseURL = 'https://shopsphere-node.onrender.com'
// baseURL: 'http://localhost:3000',

const Allproducts = ({ allProducts, setAllProducts }) => {
  const [loader, setLoader] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoader(true);
    try {
      const response = await axiosInstance.get("/products");
      setAllProducts(response.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const handleClick = async (product) => {
    const productId = product.id;
    try {
      const response = await axiosInstance.post(`/return-product/${productId}`);
      if (response.data) {
        navigate(`/product/${productId}`);
      }
    } catch (error) {
      console.error("Failed to send selected product:", error);
    }
  };

  return (
    <>
      <h3 className="text-center text-4xl font-bold my-6">
        Explore Our Collection
      </h3>

      {loader ? (
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
