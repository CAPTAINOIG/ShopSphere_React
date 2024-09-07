import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { MdOutlineShoppingBag } from "react-icons/md";



const Login = () => {

  let lower = new RegExp(`(?=.*[a-z])`);
  let upper = new RegExp(`(?=.*[A-Z])`);
  let number = new RegExp(`(?=.*[0-9])`);
  let length = new RegExp(`(?=.{8,})`);

  let formik = useFormik({
    initialValues:{
      email: '',
      password: '',
    },
    onSubmit:(values)=>{
      console.log(values);
    },
    validationSchema:yup.object({
      email: yup.string().email('Invalid email format').required( <span className='flex'><span>This field is required</span></span> ),
      password: yup.string().matches(lower, "Must include lowercase letter").matches(upper, "Must include uppercase letter").matches(number, "Must include a number").matches(length, "Must not be less than 8 characters").required("This field is required"),
    })
  })
  return (
    <div id='background' className="form-membership min-h-screen flex items-center justify-center py-10">
      <div className="preloader absolute inset-0 flex items-center justify-center">
        <div className="preloader-icon animate-spin"></div>
      </div>
      <div className="content bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <div id="logo" className="mb-6 text-center">
      <MdOutlineShoppingBag className='mx-auto text-center bg-pink-500 rounded-full p-3'  size={30}/>
          
        </div>

        <h5 className="text-center mb-6">Log in</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="h-[50px] mb-5">
            <input type="email" className="h-[50px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Email" name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} />
            <span className='text-red-500 text-[12px]'>{formik.touched.email && formik.errors.email}</span>
          </div>
          <div className="h-[50px] mb-5">
            <input type="password" className="h-[50px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Password" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} />
            <span className='text-red-500 text-[12px]'>{formik.touched.password && formik.errors.password}</span>
          </div>
          <button type='submit' className="btn btn-block w-full bg-pink-500 text-white py-3 rounded-md hover:bg-gray-200 hover:text-pink-500">Log in</button>
          <hr className="my-6" />
          <p className="text-center text-gray-600 mb-4">Already have an account?</p>
          <div className='text-center border font-bold text-sm w-[40%] mx-auto border-gray-300 my-5 hover:bg-gray-400 hover:border-gray-300 rounded'>
                <Link to="/signup">Register now!</Link>
              </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
