import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'

const Newarrivals = () => {
    const [newArrival, setNewArrival]= useState([])

    const navigate = useNavigate()

    useEffect(() => {
        arrival();
    }, [])
    
    const arrival = async () => {
        try {
            const response = await axiosInstance.get('/category/Tops')
            setNewArrival(response.data.products);
        } catch (error) {
            toast.error('Failed to fetch data');
        }
    }

    const handleProductClick = async (product) =>{
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
    <>
      <h3 className='text-center text-4xl font-bold my-6'>NEW ARRIVALS</h3>
      <div className="">
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100 lg:grid-cols-6 xl:grid-cols-4 gap-4 p-4">
          {newArrival.length === 0 ? (
            <p>No Products found</p>
          ) : (
            newArrival.map((product, i) => (
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
    </>
  )
}

export default Newarrivals