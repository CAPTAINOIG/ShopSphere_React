import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { handleNextStep, handlePreviousStep } from '../Redux/counterSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import PaystackPop from '@paystack/inline-js';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const Paymentgateway = () => {
  const store = useSelector((state) => state.counterReducer.address)
  // console.log(store);

  const shoppinsphereCartTotal = JSON.parse(localStorage.getItem("shoppinsphereCartTotal"))
  // console.log(shoppinsphereCartTotal);
  

  const dispatch = useDispatch()

  const Schema = yup.object().shape({
    userfirstname: yup.string().required(),
    userlastname: yup.string().required(),
    userphone: yup.string().required(),
    useremail: yup.string().required(),
    amount: yup.string(),

  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(Schema)
  });
  
  const publicKey = import.meta.env.VITE_APP_PAYSTACK_KEY;

const onSubmit = (data) => {
  console.log(data);

  const paystack = new PaystackPop();
  paystack.newTransaction({
    key: publicKey,
    firstname: data.userfirstname,
    lastname: data.userlastname,
    amount: shoppinsphereCartTotal * 100,
    phone: data.userphone,
    email: data.useremail,

    onSuccess(transaction) {
      if (transaction) {
        let message = `Payment Complete! Reference ${transaction.reference}`;
        console.log(message);
        toast.success(message);
        const form = {
          ...data,
          ...store,
          transactionReference: transaction.reference,
          paymentStatus: 'success',
          amount: shoppinsphereCartTotal
        };

        axiosInstance.post('/gateway', form)
        .then((response) => {
          console.log('Backend response:', response.data);
          dispatch(handleNextStep(form));
        })
        .catch((error) => {
          console.error('Error sending data to backend:', error);
          toast.error('There was an error processing your order.');
        });
      }
    },
    onCancel: () => {
      // console.log('Cancelled', 'You have cancelled the transaction', 'info');
      toast.error('Cancelled', 'You have cancelled the transaction', 'info');
      
      dispatch(handlePaymentCancelled());
    }
  });
};

// const paymentGateway = async ()=>{
//   const response = await axiosInstance.post('/gateway', form)
//   console.log(response);
// }

  const handlePrevious = () => {
    dispatch(handlePreviousStep())
  }

  return (
    <div className='bg-white shadow rounded-lg md:ms-[15%] lg:ms-0 w-[130%] ms-5  md:w-[100%]'>
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

        <div className='flex lg:gap-[12%] border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor="amount" className='font-semibold'>Amount:</label>
          <input type="text" {...register('amount', { required: true })} disabled value={`${shoppinsphereCartTotal}`} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[63%] lg:ms-0 md:ms-16 ms-16 lg:w-[75%] ${errors.amount ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.amount && <span>This field is required</span>}</small>

        <div className='flex lg:gap-[15%] border-gray-500 lg:border-b md:border-b lg:p-3 p-4'>
          <label htmlFor="useremail" className='font-semibold'>Email:</label>
          <input type="text" {...register('useremail', { required: true })} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[63%] lg:ms-0 md:ms-16 ms-16 lg:w-[75%] ${errors.useremail ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.useremail && <span>This field is required</span>}</small>
        
        <div className='flex gap-3 border-gray-500 lg:border-b md:border-b lg:p-3 p-2'>
          <label htmlFor="userphone" className='font-semibold'>Phone Number:</label>
          <input type="text" {...register('userphone', { required: true })} className={`border border-black focus:outline-none py-1 rounded h-[35px] p-3 w-[60%] lg:w-[75%] ${errors.userphone ? 'border-red-500' : ''}`} />
        </div>
        <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.userphone && <span>This field is required</span>}</small>



        <div className='flex justify-around my-5'>
          <button className='lg:w-[30%] md:w-[100%] w-[100%] bg-pink-500 rounded hover:bg-gray-200 hover:text-pink-500 text-white p-2' onClick={handlePrevious}>Previous</button>
          <button className='lg:w-[30%] md:w-[100%] w-[100%] bg-pink-500 rounded hover:bg-gray-200 hover:text-pink-500 text-white p-2' type='submit'>Next</button>
        </div>
    </form >
    </div >
  )
}

export default Paymentgateway