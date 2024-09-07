import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import ProductCard from './ProductCard'

const Cloth = () => {
    const [clothCategory, setClothCategory]= useState([])

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
    <div className='p-6 bg-gray-200'>
      {clothCategory?.length === 0 ? (
        <p className='text-center text-lg font-semibold'>No product found</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {clothCategory.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      )}
    </div>
      </>
  )
}

export default Cloth