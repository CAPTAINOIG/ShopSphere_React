import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ProductSkeleton from '../hooks/ProductSkeleton';
import { useGetClothProducts } from '../hooks/product';


const Cloth = () => {
  const navigate = useNavigate();

  const {data: clothCategory, isLoading, isError} = useGetClothProducts();
  
  const handleProductClick = async (product) => {
    const productId = product.id
    try {
      const response = await axios.post(`https://shopsphere-node.onrender.com/return-product/${productId}`);
      if (response.data) {
        navigate(`/product/${productId}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Failed to send selected product:", error);
    }
  };

  return (
    <>
      <h3 className='text-center text-4xl my-3 font-bold'>YOU MIGHT ALSO LIKE</h3>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100 lg:grid-cols-6 xl:grid-cols-4 gap-4 p-4">
          {clothCategory.products?.length === 0 ? (
            <p className='text-center text-lg font-semibold'>No product found</p>
          ) : (
            clothCategory.products?.length > 0 && clothCategory.products.map((product, i) => (
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