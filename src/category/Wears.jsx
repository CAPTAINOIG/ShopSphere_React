import React, { useEffect } from 'react'
import { useState } from 'react'
import axiosInstance from '../axiosInstance'
import ProductCard from './ProductCard';
import gif from '../assets/image/gif.gif';


const Wears = () => {
    const [categoryWears, setCategoryWears] = useState([]);
    const [loader, setLoader] = useState('')

    useEffect(() => {
        wears();
    }, [])

    const wears = async () => {
      setLoader(true);
        try {
            const response = await axiosInstance.get('/category/Clothing')
            // console.log(response.data.products);
            if(response.data && response.data.products){
              setCategoryWears(response.data.products)
            } else{
              setCategoryWears([]);
            }
            setLoader(false);
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    }

    return (
        <>
      <h3 className='text-center text-4xl font-bold my-3'>Fashion</h3>
      {loader ? (
     <div className="flex text-center justify-center items-center ">
     <img
       src={gif}
       alt="Loading..."
       className="lg:ms-[-100px] border p-3 shadow-xl rounded-xl w-[50px] mt-10"
     />
        </div>
      ) : (
    <div className='p-6 bg-gray-100'>
      {categoryWears?.length === 0 ? (
        <p className='text-center text-lg font-semibold'>No product found</p>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
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