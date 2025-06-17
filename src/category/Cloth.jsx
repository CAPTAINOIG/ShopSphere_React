import React, { useEffect, useState } from 'react'
// import axiosInstance from '../axiosInstance'
// import ProductCard from './ProductCard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ProductSkeleton from '../hooks/ProductSkeleton';


const Cloth = () => {
  const navigate = useNavigate();
  const [clothCategory, setClothCategory] = useState([])
  const [loader, setLoader] = useState(false)

  const handleProductClick = async (product) => {
    const productId = product.id

    try {
      const response = await axios.post(`https://shopsphere-node.onrender.com/return-product/${productId}`);
      if (response.data) {
        navigate(`/product/${productId}`);
      }
    } catch (error) {
      console.error("Failed to send selected product:", error);
    }
  };


  useEffect(() => {
    cloth();
  }, [])

  const cloth = async () => {
    setLoader(true)
    try {
      const response = await axios.get('https://shopsphere-node.onrender.com/category/Shirts')
      if (response.data && response.data.products) {
        setClothCategory(response.data.products);
      }
      else {
        setClothCategory([]);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  }
  return (
    <>
      <h3 className='text-center text-4xl my-3 font-bold'>YOU MIGHT ALSO LIKE</h3>
      {loader ? (
        <ProductSkeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100 lg:grid-cols-6 xl:grid-cols-4 gap-4 p-4">
          {clothCategory.length === 0 ? (
            <p className='text-center text-lg font-semibold'>No product found</p>
          ) : (
            clothCategory.map((product, i) => (
              <div onClick={() => handleProductClick(product)} key={i} className="bg-white border cursor-pointer border-gray-200 rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow duration-300">
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
  )
}

export default Cloth