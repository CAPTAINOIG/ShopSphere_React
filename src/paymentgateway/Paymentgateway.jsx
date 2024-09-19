import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { handleNextStep, handlePreviousStep } from '../Redux/counterSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

const Paymentgateway = () => {
  const store = useSelector((state) => state.counterReducer.address)
  console.log(store);

  const shoppinsphereCartTotal = JSON.parse(localStorage.getItem("shoppinsphereCartTotal"))

  const dispatch = useDispatch()

  const Schema = yup.object().shape({
    userfirstname: yup.string().required(),
    userlastname: yup.string().required(),
    userphone: yup.string().required(),
    useremail: yup.string().required(),
    // useramount: yup.string().required(),

  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(Schema)
  });
  
  const onSubmit =(data)=>{
    console.log(data); 

    const form = {...store, ...data}
    console.log(form);
    dispatch(handleNextStep(form))
    
  }

  const handlePrevious = () => {
    dispatch(handlePreviousStep())
  }

  return (
    <div className='bg-white shadow rounded-lg py-5 md:ms-[15%] lg:ms-0 w-[130%] ms-5  md:w-[100%]'>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[100%] w-[100%] md:w-[100%] py-5 lg:mt-8 mt-0 px-2">
      <h1 className='text-center font-bold text-2xl'>Payment</h1>
      <div className='flex lg:gap-10 gap-3 border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor='userfirstname' className='font-semibold'>First Name:</label>
          <input {...register("userfirstname", { required: true })} type="text" className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[65%] lg:ms-0 md:ms-5 ms-5 lg:w-[75%] ${errors.userfirstname ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.userfirstname && <span>This field is required</span>}</small>

        <div className='flex lg:gap-10 gap-3 border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor='userlastname' className='font-semibold'>Last Name:</label>
          <input {...register("userlastname", { required: true })} type="text" className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[65%] lg:ms-0 md:ms-5 ms-5 lg:w-[75%] ${errors.userlastname ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.userlastname && <span>This field is required</span>}</small>

        <div className='flex gap-3 border-gray-500 lg:border-b md:border-b lg:p-3 p-2'>
          <label htmlFor="userphone" className='font-semibold'>Phone Number:</label>
          <input type="text" {...register('userphone', { required: true })} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[60%] lg:w-[75%] ${errors.userphone ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.userphone && <span>This field is required</span>}</small>

        <div className='flex lg:gap-[15%] border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor="useremail" className='font-semibold'>Email:</label>
          <input type="text" {...register('useremail', { required: true })} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[63%] lg:ms-0 md:ms-16 ms-16 lg:w-[75%] ${errors.useremail ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.useremail && <span>This field is required</span>}</small>

        <div className='flex lg:gap-[15%] border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor="useremail" className='font-semibold'>Email:</label>
          <input type="text" {...register('useremail', { required: true })} value={`${shoppinsphereCartTotal}`} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[63%] lg:ms-0 md:ms-16 ms-16 lg:w-[75%] ${errors.useremail ? 'border-red-500' : ''}`} />
        </div>

        <div className='flex justify-around'>
          <button className='lg:w-[30%] md:w-[100%] w-[100%] bg-pink-500 rounded hover:bg-gray-200 hover:text-pink-500 text-white p-2' onClick={handlePrevious}>Previous</button>
          <button className='lg:w-[30%] md:w-[100%] w-[100%] bg-pink-500 rounded hover:bg-gray-200 hover:text-pink-500 text-white p-2' type='submit'>Next</button>
        </div>
    </form >
    </div >
  )
}

export default Paymentgateway