import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Countryaddress from './Countryaddress';
import { handleNextStep } from '../Redux/counterSlice';

const Address = () => {
  const [location, setLocation] = useState('');
 

  const dispatch = useDispatch();
  const store = useSelector((state) => state.counterReducer.address);
  console.log(store);

  const Schema = yup.object().shape({
    fullname: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required(),
    address: yup.string().required(),
    zip: yup.string(),

  })

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(Schema)
  });

  useEffect(() => {
    if (store) {
      setValue('fullname', store?.fullname)
      setValue('phone', store?.phone)
      setValue('email', store?.email)
      setValue('address', store?.address)
      setValue('address', store?.address)
      setValue('zip', store?.zip)
    }
  }, [])


  const onSubmit = (data) =>{
    const form = {...data, location}
    console.log(form);
    dispatch(handleNextStep(form))
  } 

  return (
    <div className='bg-white shadow rounded-lg md:ms-[15%] lg:ms-0 w-[130%] ms-5  md:w-[100%]'>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[100%] w-[100%] md:w-[100%] py-5 lg:mt-8 mt-0 px-2">
        <h1 className='text-center font-bold text-2xl'>Shipping Information</h1>
        <div className='flex lg:gap-10 gap-3 border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor='fullname' className='font-semibold'>Full Name:</label>
          <input {...register("fullname", { required: true })} type="text" className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[65%] lg:ms-0 md:ms-5 ms-5 lg:w-[75%] ${errors.fullname ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.fullname && <span>This field is required</span>}</small>

        <div className='flex gap-3 border-gray-500 lg:border-b md:border-b lg:p-3 p-2'>
          <label htmlFor="phone" className='font-semibold'>Phone Number:</label>
          <input type="text" {...register('phone', { required: true })} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[60%] lg:w-[75%] ${errors.fullname ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.phone && <span>This field is required</span>}</small>

        <div className='flex lg:gap-[15%] border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor="email" className='font-semibold'>Email:</label>
          <input type="text" {...register('email', { required: true })} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[63%] lg:ms-0 md:ms-16 ms-16 lg:w-[75%] ${errors.email ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.email && <span>This field is required</span>}</small>

        <div className='flex gap-3 lg:gap-[19%] border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor="zip" className='font-semibold'>ZIP:</label>
          <input type="text" {...register('zip', { required: true })} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[63%] lg:ms-0 md:ms-16 ms-[66px] lg:w-[75%] ${errors.zip ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.phone && <span>This field is required</span>}</small>

        <div className='flex gap-3 lg:gap-[13%] border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor="address" className='font-semibold'>Address:</label>
          <input type="text" {...register('address', { required: true })} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[62%] lg:ms-0 md:ms-10 ms-10 lg:w-[75%] ${errors.address ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.address && <span>This field is required</span>}</small>

        <div className='flex lg:gap-5 gap-3 border-gray-500 border-b lg:p-5 p-4'>
          <label for="shippingmethod" className='font-semibold'>ShippingMethod</label>
          <select id="shippingmethod" {...register('shippingmethod', {required: true})} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[62%] lg:ms-0 md:ms-10 ms-10 lg:w-[85%] ${errors.shippingmethod ? 'border-red-500' : ''}`}>
            <option value="standard">Standard Shipping</option>
            <option value="express">Express Shipping</option>
          </select>
        </div>

        <div className='flex lg:gap-5 gap-3 border-gray-500  lg:p-3 p-4'>
          <label htmlFor="" className='font-semibold'>City&Country</label>
          <Countryaddress setLocation={setLocation} />
        </div>

        <button className='lg:w-[100%] md:w-[100%] w-[100%] bg-pink-500 rounded hover:bg-gray-200 hover:text-pink-500 text-white p-2' type='submit'>Continue to Payment</button>
      </form>
    </div>
  )
}

export default Address