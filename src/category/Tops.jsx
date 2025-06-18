import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import gif from "../assets/image/gif.gif";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const Tops = () => {
  const [topData, setTopData] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    sponsoredProducts();
  }, []);

  const sponsoredProducts = async () => {
    try {
      setLoader(true);
      const response = await axiosInstance.get("/category/Cameras");
      setTopData(response.data.products);
      setLoader(false);
    } catch (error) {
      toast.error("Failed to fetch data");
      setLoader(false);
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
    }
  };

  return (
    <>
    <Toaster position="top-right" />
      <h3 className="text-center text-4xl my-3 font-bold">
        SPONSORED PRODUCTS
      </h3>
      {loader ? (
        <div className="flex text-center justify-center items-center ">
          <img
            src={gif}
            alt="Loading..."
            className="lg:ms-[-100px] border p-3 shadow-xl rounded-xl w-[50px] mt-10"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100 lg:grid-cols-6 xl:grid-cols-4 gap-4 p-4">
          {topData.length === 0 ? (
            <p className="text-center text-lg font-semibold">
              No product found
            </p>
          ) : (
            topData.map((product, i) => (
              <div
                onClick={() => handleProductClick(product)}
                key={i}
                className="bg-white border cursor-pointer border-gray-200 rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow duration-300"
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
                <p className="text-center font-semibold mt-2">
                  {product?.name}
                </p>
                <p className="text-center text-sm">${product?.price}</p>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Tops;
