import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleNextStep, handlePreviousStep } from '../Redux/counterSlice'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';


const Delivery = () => {
  const store = useSelector((state) => state.counterReducer.address)
  console.log(store);

  const dispatch = useDispatch();

  const Schema = yup.object().shape({
    pickupname: yup.string().required(),
    pickupmail: yup.string().required(),
    phoneNumber: yup.string().required(),
    pickupstation: yup.string()
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(Schema)
  });

  const onSubmit = (data) => {
    let form = { ...store, ...data };
    console.log(form);
    dispatch(handleNextStep(form))
  };

  // useEffect(() => {
  //   setValue('pickupname', store.pickupname)
  //   setValue('pickupmail', store.pickupmail)
  //   setValue('phoneNumber', store.phoneNumber)
  //   setValue('pickupstation', store.pickupstation)
  // }, [])


  const handlePrevious = () => {
    dispatch(handlePreviousStep())
  };

  return (
    <div className='bg-white shadow rounded-lg py-5 md:ms-[15%] lg:ms-0 w-[130%] ms-5  md:w-[100%]'>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[100%] w-[100%] md:w-[100%] py-5 lg:mt-8 mt-0 px-2">
        <h1 className='text-center font-bold text-2xl'>PickupForm Information</h1>
        <div className='flex lg:gap-10 gap-3 border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor='pickupname' className='font-semibold'>Full Name:</label>
          <input {...register("pickupname", { required: true })} type="text" className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[65%] lg:ms-0 md:ms-5 ms-5 lg:w-[75%] ${errors.pickupname ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.pickupname && <span>This field is required</span>}</small>

        <div className='flex gap-3 border-gray-500 lg:border-b md:border-b lg:p-3 p-2'>
          <label htmlFor="phoneNumber" className='font-semibold'>Phone Number:</label>
          <input type="text" {...register('phoneNumber', { required: true })} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[60%] lg:w-[75%] ${errors.phoneNumber ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.phoneNumber && <span>This field is required</span>}</small>

        <div className='flex lg:gap-[15%] border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor="pickupmail" className='font-semibold'>Email:</label>
          <input type="text" {...register('pickupmail', { required: true })} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[63%] lg:ms-0 md:ms-16 ms-16 lg:w-[75%] ${errors.pickupmail ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.pickupmail && <span>This field is required</span>}</small>

        <div className='flex lg:gap-5 gap-3 border-gray-500 border-b lg:p-5 p-4'>
          <label for="pickupStation">Pickup Station</label>
          <select {...register("pickupstation", { required: true })} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[62%] lg:ms-0 md:ms-10 ms-10 lg:w-[85%] ${errors.shippingmethod ? 'border-red-500' : ''}`}>
            <option value="">Select a station</option>
            <option value="station1">Station 1 - City Center</option>
            <option value="station2">Station 2 - North Area</option>
            <option value="station2">Station 2 - North Area</option>
          </select>
        </div>
        <div className='flex justify-around mt-5'>
          <button className='lg:w-[30%] md:w-[100%] w-[100%] bg-pink-500 rounded hover:bg-gray-200 hover:text-pink-500 text-white p-2' onClick={handlePrevious}>Previous</button>
          <button className='lg:w-[30%] md:w-[100%] w-[100%] bg-pink-500 rounded hover:bg-gray-200 hover:text-pink-500 text-white p-2' type='submit'>Next</button>
        </div>
      </form>
    </div>
  )
}

export default Delivery