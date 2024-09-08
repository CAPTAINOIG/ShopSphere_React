import React, { useEffect } from 'react'
import { useState } from 'react'
import axiosInstance from '../axiosInstance'
import ProductCard from './ProductCard';

const Wears = () => {
    const [categoryWears, setCategoryWears] = useState([]);

    useEffect(() => {
        wears();
    }, [])

    const wears = async () => {
        try {
            const response = await axiosInstance.get('/category/Clothing')
            // console.log(response.data.products);
            setCategoryWears(response.data.products)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
      <h3 className='text-center text-4xl font-bold my-3'>Fashion</h3>
    <div className='p-6 bg-gray-100'>
      {categoryWears?.length === 0 ? (
        <p className='text-center text-lg font-semibold'>No product found</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {categoryWears.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      )}
    </div>
      </>
    )
}

export default Wears