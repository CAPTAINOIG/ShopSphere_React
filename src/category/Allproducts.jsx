import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const Allproducts = ({allProducts, setAllProducts}) => {
  // const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
      // console.log(response.data);
      
      setAllProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3 className='text-center text-4xl font-bold my-6'>Explore Our Collection</h3>
      <div className="">
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100 lg:grid-cols-6 xl:grid-cols-5 gap-4 p-4">
          {allProducts.length === 0 ? (
            <p>No allProducts found</p>
          ) : (
            allProducts.map((product, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow duration-300">
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
      </div>
    </>
  );
};

export default Allproducts;
