import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import gif from '../assets/image/gif.gif';

const Allproducts = ({ allProducts, setAllProducts }) => {
  const [loader, setLoader] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoader(true)
    try {
      const response = await axiosInstance.get('/products');
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
      <h3 className='text-center text-4xl font-bold my-6'>Explore Our Collection</h3>
      {loader ? (
          <div className="flex justify-center items-center ">
        <img
          src={gif}
          alt="Loading..."
          className="lg:ms-[-100px] border p-3 shadow-xl rounded-xl w-[50px] mt-10"
        />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100 lg:grid-cols-6 xl:grid-cols-5 gap-4 p-4">
          {allProducts.length === 0 ? (
              <p className='text-center text-lg font-semibold'>No product found</p>
          ) : (
            allProducts.map((product, i) => (
              <div
                onClick={() => handleClick(product)}
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
                <p className="text-center font-semibold mt-2">{product?.name}</p>
                <p className="text-center text-sm">${product?.price}</p>
              </div>
            ))
          )}
        </div>
      )}

    </>
  );
};

export default Allproducts;
