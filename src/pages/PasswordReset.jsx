import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as yup from 'yup'
import { MdOutlineShoppingBag } from "react-icons/md";
import gif from '../assets/image/gif.gif'
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
const email = localStorage.getItem('user');
console.log(email);

const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  let lower = new RegExp(`(?=.*[a-z])`);
  let upper = new RegExp(`(?=.*[A-Z])`);
  let number = new RegExp(`(?=.*[0-9])`);
  let length = new RegExp(`(?=.{8,})`);

  let formik = useFormik({
    initialValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
    
    
    onSubmit: async (values) => {
        setLoading(true);
        const formData = {...values, email: email};
        console.log(formData);
        
        if (values.newPassword !== values.confirmPassword) {
          toast.error('Your passwords do not match');
          setLoading(false);
          return;
        }
      try {
        const response = await axiosInstance?.post('/reset', formData)
        console.log(response);
        toast.success(`${response?.data?.message}`)
        setLoading(false);
        navigate('/login');
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(`${error?.response?.data?.message}`)
      }
    },
    validationSchema: yup.object({
      otp: yup.string().required(<span className='flex'><span>This field is required</span></span>),
      newPassword: yup.string().matches(lower, "Must include lowercase letter").matches(upper, "Must include uppercase letter").matches(number, "Must include a number").matches(length, "Must not be less than 8 characters").required("This field is required"),
      confirmPassword: yup.string().matches(lower, "Must include lowercase letter").matches(upper, "Must include uppercase letter").matches(number, "Must include a number").matches(length, "Must not be less than 8 characters").required("This field is required"),
    }),
   
  })
  return (
    <div id='background' className="form-membership min-h-screen flex items-center justify-center py-10">
    <div className="preloader absolute inset-0 flex items-center justify-center">
      <div className="preloader-icon animate-spin"></div>
    </div>
    <div className="content bg-white mx-10 p-8 rounded-lg shadow-md w-full max-w-sm">
      <div id="logo" className="mb-6 text-center">
        <MdOutlineShoppingBag className='mx-auto text-center bg-pink-500 rounded-full p-3' size={30} />
      </div>

      <h5 className="text-center mb-6">Enter the otp sent to your email</h5>
      <form onSubmit={formik.handleSubmit}>
        <div className="">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Otp</label>
          <input type="otp" className="h-[50px] w-full p-3 border border-gray-300 my-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter your otp" name='otp' onBlur={formik.handleBlur} onChange={formik.handleChange} />
          <span className='text-red-500 text-[12px]'>{formik.touched.otp && formik.errors.otp}</span>
        </div>
        <div className="">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Passwrod</label>
          <input type="password" className="h-[50px] w-full p-3 border border-gray-300 my-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter your password" name='newPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} />
          <span className='text-red-500 text-[12px]'>{formik.touched.newPassword && formik.errors.newPassword}</span>
        </div>
        <div className="">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" className="h-[50px] w-full p-3 border border-gray-300 my-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter your password" name='confirmPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} />
          <span className='text-red-500 text-[12px]'>{formik.touched.confirmPassword && formik.errors.confirmPassword}</span>
        </div>
        <button type='submit' className="btn btn-block w-full bg-pink-500 text-white py-3 my-3 rounded-md hover:bg-gray-200 hover:text-pink-500">
          {loading ? <img src={gif} alt="" className='w-[25px] text-center mx-auto' /> : ('Log in')}
        </button>
      </form>
    </div>
  </div>
  )
}

export default PasswordReset