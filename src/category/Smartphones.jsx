import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from '../hooks/ProductSkeleton';
import { toast, Toaster } from 'sonner';
import { useGetSmartPhoneProducts } from '../hooks/product';


const Smartphones = () => {

  const {data: smartPhonesCategory, isLoading, isError} = useGetSmartPhoneProducts();

  return (
    <>
    <Toaster position="top-right" />
      <h3 className='text-center text-4xl font-bold'>Smartphones</h3>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <div className='p-6 bg-gray-100'>
          {smartPhonesCategory?.products?.length === 0 ? (
            <p className='text-center text-lg font-semibold'>No product found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {smartPhonesCategory?.products.length > 0 && smartPhonesCategory?.products?.map((item, index) => (
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
