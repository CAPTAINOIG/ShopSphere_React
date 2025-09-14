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

  const Schema = yup.object().shape({
    fullname: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    zip: yup.string(),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(Schema)
  });

  const onSubmit = (data) =>{
    const form = {...data, country:location}
    dispatch(handleNextStep(form))
  } 

  return (
   <div className="bg-white shadow rounded-lg w-full max-w-2xl mx-auto p-4">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full py-5 lg:mt-8 mt-0 px-2 space-y-4"
  >
    <h1 className="text-center font-bold text-2xl">Shipping Information</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
      <label htmlFor="fullname" className="font-semibold">
        Full Name:
      </label>
      <input
        {...register("fullname", { required: true })}
        type="text"
        className={`border border-black focus:outline-none py-2 rounded px-3 w-full md:col-span-2 ${
          errors.fullname ? "border-red-500" : ""
        }`}
      />
    </div>
    {errors.fullname && (
      <small className="text-red-600">This field is required</small>
    )}
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
      <label htmlFor="phone" className="font-semibold">
        Phone Number:
      </label>
      <input
        type="text"
        {...register("phone", { required: true })}
        className={`border border-black focus:outline-none py-2 rounded px-3 w-full md:col-span-2 ${
          errors.phone ? "border-red-500" : ""
        }`}
      />
    </div>
    {errors.phone && (
      <small className="text-red-600">This field is required</small>
    )}
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
      <label htmlFor="email" className="font-semibold">
        Email:
      </label>
      <input
        type="text"
        {...register("email", { required: true })}
        className={`border border-black focus:outline-none py-2 rounded px-3 w-full md:col-span-2 ${
          errors.email ? "border-red-500" : ""
        }`}
      />
    </div>
    {errors.email && (
      <small className="text-red-600">This field is required</small>
    )}

    {/* City */}
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
      <label htmlFor="city" className="font-semibold">
        City:
      </label>
      <input
        type="text"
        {...register("city", { required: true })}
        className={`border border-black focus:outline-none py-2 rounded px-3 w-full md:col-span-2 ${
          errors.city ? "border-red-500" : ""
        }`}
      />
    </div>
    {errors.city && (
      <small className="text-red-600">This field is required</small>
    )}

    {/* Zip */}
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
      <label htmlFor="zip" className="font-semibold">
        ZIP:
      </label>
      <input
        type="text"
        {...register("zip", { required: true })}
        className={`border border-black focus:outline-none py-2 rounded px-3 w-full md:col-span-2 ${
          errors.zip ? "border-red-500" : ""
        }`}
      />
    </div>
    {errors.zip && (
      <small className="text-red-600">This field is required</small>
    )}

    {/* Address */}
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
      <label htmlFor="address" className="font-semibold">
        Address:
      </label>
      <input
        type="text"
        {...register("address", { required: true })}
        className={`border border-black focus:outline-none py-2 rounded px-3 w-full md:col-span-2 ${
          errors.address ? "border-red-500" : ""
        }`}
      />
    </div>
    {errors.address && (
      <small className="text-red-600">This field is required</small>
    )}

    {/* Shipping Method */}
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
      <label htmlFor="shippingmethod" className="font-semibold">
        Shipping Method:
      </label>
      <select
        id="shippingmethod"
        {...register("shippingmethod", { required: true })}
        className={`border border-black focus:outline-none py-2 rounded px-3 w-full md:col-span-2 ${
          errors.shippingmethod ? "border-red-500" : ""
        }`}
      >
        <option value="standard">Standard Shipping</option>
        <option value="express">Express Shipping</option>
      </select>
    </div>

    {/* Country */}
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
      <label htmlFor="country" className="font-semibold">
        Country:
      </label>
      <Countryaddress setLocation={setLocation} />
    </div>

    {/* Button */}
    <button
      className="w-full bg-pink-500 rounded hover:bg-gray-200 hover:text-pink-500 text-white p-2"
      type="submit"
    >
      Continue to Payment
    </button>
  </form>
</div>

  )
}

export default Address