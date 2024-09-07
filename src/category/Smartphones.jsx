import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import ProductCard from './ProductCard';



const Smartphones = () => {
  const [smartPhonesCat, setSmartPhonesCat] = useState([]);

  useEffect(() => {
    fetchSmartphones();
  }, []);

  const fetchSmartphones = async () => {
    try {
      const response = await axiosInstance.get('/category/Smartphones');
      // console.log(response.data.products);
      setSmartPhonesCat(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return ( 
  <>
      <h3 className='text-center text-4xl font-bold'>Smartphones</h3>
    <div className='p-6 bg-gray-100'>
      {smartPhonesCat?.length === 0 ? (
        <p className='text-center text-lg font-semibold'>No product found</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {smartPhonesCat.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      )}
    </div>
      </>
  );
};

export default Smartphones;
