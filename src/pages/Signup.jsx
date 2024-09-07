import React from 'react';
import ava1 from '../assets/image/ava1.png'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'



const Signup = () => {

  let lower = new RegExp(`(?=.*[a-z])`);
  let upper = new RegExp(`(?=.*[A-Z])`);
  let number = new RegExp(`(?=.*[0-9])`);
  let length = new RegExp(`(?=.{8,})`);

  let formik = useFormik({
    initialValues:{
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    onSubmit:(values)=>{
      console.log(values);
    },
    validationSchema:yup.object({
      firstname: yup.string().required( <span className='flex'><span>This field is required</span></span> ),
      lastname: yup.string().required( <span className='flex'><span>This field is required</span></span> ),
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
        <div id="logo" className="mb-6">
        <img className='mx-auto' src={ava1} alt="" />
        </div>
        <h5 className="text-center mb-6">Create account</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="h-[50px] mb-5">
            <input type="text" className="h-[50px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Firstname" name='firstname' onBlur={formik.handleBlur} onChange={formik.handleChange} />
            <span className='text-red-500 text-[12px]'>{formik.touched.firstname && formik.errors.firstname}</span>
          </div>
          <div className="h-[50px] mb-5">
            <input type="text" className="h-[50px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Lastname" name='lastname' onBlur={formik.handleBlur} onChange={formik.handleChange}  />
            <span className='text-red-500 text-[12px]'>{formik.touched.lastname && formik.errors.lastname}</span>
          </div>
          <div className="h-[50px] mb-5">
            <input type="email" className="h-[50px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Email" name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} />
            <span className='text-red-500 text-[12px]'>{formik.touched.email && formik.errors.email}</span>
          </div>
          <div className="h-[50px] mb-5">
            <input type="password" className="h-[50px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Password" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} />
            <span className='text-red-500 text-[12px]'>{formik.touched.password && formik.errors.password}</span>
          </div>
          <button type='submit' className="btn btn-primary btn-block w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"> Register</button>
          <hr className="my-6" />
          <p className="text-center text-gray-600 mb-4">Already have an account?</p>
          <div className='text-center border font-bold text-sm w-[20%] mx-auto border-gray-300  my-5 hover:bg-gray-400 hover:border-gray-300 rounded'>
        <Link to="/signin" >Sign in!</Link>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
