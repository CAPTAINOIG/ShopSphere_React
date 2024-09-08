import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
// import ProductCard from './ProductCard'
import { useNavigate } from 'react-router-dom'

const Cloth = () => {
  const navigate = useNavigate();
    const [clothCategory, setClothCategory]= useState([])
    // console.log('clothCategory', clothCategory);
    
    const handleProductClick = (product) => {
      const productName = product.name.toLowerCase().replace(/\s+/g, '-');
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      navigate(`/product/${productName}`);
    };

    useEffect(() => {
        cloth();
    }, [])
    
    const cloth = async () => {
        try {
            const response = await axiosInstance.get('/category/Shirts')
            console.log(response.data);
            setClothCategory(response.data.products);
        } catch (error) {
            console.log(error);   
        }
    }
  return (
    <>
      <h3 className='text-center text-4xl my-3 font-bold'>YOU MIGHT ALSO LIKE</h3>
      <div className="">
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100 lg:grid-cols-6 xl:grid-cols-4 gap-4 p-4">
          {clothCategory.length === 0 ? (
            <p>No allProducts found</p>
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
      </div>
    {/* <div className='p-6 bg-gray-200'>
      {clothCategory?.length === 0 ? (
        <p className='text-center text-lg font-semibold'>No product found</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {clothCategory.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      )}
    </div> */}
      </>
  )
}

export default Cloth