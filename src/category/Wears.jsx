import React, { useEffect } from 'react'
import { useState } from 'react'
import axiosInstance from '../axiosInstance'
import ProductCard from './ProductCard';
import { toast } from 'react-toastify';
import axios from 'axios';
import ProductSkeleton from '../hooks/ProductSkeleton';


const Wears = () => {
  const [categoryWears, setCategoryWears] = useState([]);
  const [loader, setLoader] = useState('')

  useEffect(() => {
    wears();
  }, [])

  const wears = async () => {
    setLoader(true);
    try {
      const response = await axios.get('https://shopsphere-node.onrender.com/category/Clothing')
      if (response.data && response.data.products) {
        setCategoryWears(response.data.products)
      } else {
        setCategoryWears([]);
      }
      setLoader(false);
    } catch (error) {
      toast.error('Failed to fetch data');
      setLoader(false);
    }
  }

  return (
    <>
      <h3 className='text-center text-4xl font-bold my-3'>Fashion</h3>
      {loader ? (
        <ProductSkeleton />
      ) : (
        <div className='p-6 bg-gray-100'>
          {categoryWears?.length === 0 ? (
            <p className='text-center text-lg font-semibold'>No product found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {categoryWears.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Wears