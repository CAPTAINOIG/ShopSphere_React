import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import axiosInstance from '../axiosInstance';
import { toast, ToastContainer } from 'react-toastify'
// import Toastify from 'toastify-js';



const Newsletter = () => {
    const [email, setEmail] = useState('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleNews = async () => {
        if (!email) {
            toast.error('Email address is required.');
            return;
        }

        if (!emailRegex.test(email)) {
            toast.error('Invalid email address.');
            return;
        }
        try {
            const response = await axiosInstance.post('/news', {email});
            console.log(response?.data);
            toast.success(`${response?.data?.message}`)
        } catch (error) {
            console.log(error?.response?.data?.message);
            toast.error(`${error?.response?.data?.message}`);
        }
    }
    return (
        <>
       
        <div className='grid grid-cols-1 lg:grid-cols-2 mx-10 bg-gray-800 my-5 rounded-md p-6'>
            <div className='flex flex-col justify-center'>
                <h2 className='text-4xl font-bold text-white text-center mb-2'>DON'T MISS OUT ON OUR</h2>
                <h2 className='text-4xl font-bold text-white text-center mb-6'>LATEST PROMOTIONS AND UPDATES</h2>
            </div>
            <div className="flex flex-col justify-center gap-4 ms-20">
                <div className="relative flex w-full max-w-sm items-center border bg-white border-gray-300 rounded-full h-10 px-3">
                    <MdEmail className='text-gray-400' size={20} />
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your Email address" className="w-full py-2 pl-3 bg-transparent outline-none rounded-full text-sm"/>
                </div>
                <button onClick={() => handleNews()} className='w-full max-w-sm hover:bg-pink-600 hover:text-gray-100 bg-gray-100 text-gray-900 py-2 rounded-md text-sm'>
                    SUBSCRIBE TO NEWSLETTER
                </button>
            </div>
        </div>
            <ToastContainer/>
        </>
    );
};

export default Newsletter;
