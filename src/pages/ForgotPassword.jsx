import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as yup from 'yup'
import { MdOutlineShoppingBag } from "react-icons/md";
import gif from '../assets/image/gif.gif'
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  let lower = new RegExp(`(?=.*[a-z])`);
  let upper = new RegExp(`(?=.*[A-Z])`);
  let number = new RegExp(`(?=.*[0-9])`);
  let length = new RegExp(`(?=.{8,})`);

  let formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axiosInstance?.post('/forgotPassword', values)
        toast.success(`${response?.data?.message}`)
        setLoading(false);
        const userData = response?.data?.email;
        localStorage.setItem('user', (userData));
        navigate('/password-reset');
      } catch (error) {
        setLoading(false);
        toast.error(`${error?.response?.data?.message}`)
      }
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email format').required(<span className='flex'><span>This field is required</span></span>),
    })
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

      <h5 className="text-center mb-6">Forgot Password</h5>
      <form onSubmit={formik.handleSubmit}>
        <div className="">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="h-[50px] w-full p-3 border border-gray-300 my-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Email" name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} />
          <span className='text-red-500 text-[12px]'>{formik.touched.email && formik.errors.email}</span>
        </div>
        <button type='submit' className="btn btn-block w-full bg-pink-500 text-white py-3 my-3 rounded-md hover:bg-gray-200 hover:text-pink-500">
          {loading ? <img src={gif} alt="" className='w-[25px] text-center mx-auto' /> : ('Log in')}
        </button>
      </form>
    </div>
  </div>
  )
}

export default ForgotPassword