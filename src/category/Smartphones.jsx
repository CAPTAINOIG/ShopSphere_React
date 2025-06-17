import React, { useEffect, useState } from 'react';
// import axiosInstance from '../axiosInstance';
import ProductCard from './ProductCard';
import axios from 'axios';
import ProductSkeleton from '../hooks/ProductSkeleton';
import { toast, Toaster } from 'sonner';


const Smartphones = () => {
  const [smartPhonesCat, setSmartPhonesCat] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    fetchSmartphones();
  }, []);

  const fetchSmartphones = async () => {
    setLoader(true);
    try {
      const response = await axios.get('https://shopsphere-node.onrender.com/category/Smartphones');
      if (response.data && response.data.products) {
        setSmartPhonesCat(response.data.products);
      }
      else {
        setSmartPhonesCat([]);
      }
      setLoader(false);
    } catch (error) {
      toast.error('Failed to fetch data');
      setLoader(false);
    }
  };

  return (
    <>
    <Toaster position="top-right" />
      <h3 className='text-center text-4xl font-bold'>Smartphones</h3>
      {loader ? (
        <ProductSkeleton />
      ) : (
        <div className='p-6 bg-gray-100'>
          {smartPhonesCat.length === 0 ? (
            <p className='text-center text-lg font-semibold'>No product found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {smartPhonesCat.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Smartphones;
