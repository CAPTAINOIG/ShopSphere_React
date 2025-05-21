import React, { useEffect, useState } from 'react';
// import ava1 from '../assets/image/ava2.png';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const [count, setCount] = useState(1);
    const [quality, setQuality] = useState(1);
    const [customer, setCustomer] = useState(1);


    const brandTarget = 200;
    const qualityTarget = 2000;
    const customerTarget = 3000;

    useEffect(() => {
        const countBrand = () => {
            if (count < brandTarget) {
                const timer = setTimeout(() => setCount(prevCount => prevCount + 1), 10);
                return () => clearTimeout(timer);
            }
        };

        const countQuality = () => {
            if (quality < qualityTarget) {
                const timer = setTimeout(() => setQuality(prevQuality => prevQuality + 1), 10);
                return () => clearTimeout(timer);
            }
        };

        const countCustomer = () => {
            if (customer < customerTarget) {
                const timer = setTimeout(() => setCustomer(prevCustomer => prevCustomer + 1), 10);
                return () => clearTimeout(timer);
            }
        };

        // Start counting only if not at target
        countBrand();
        countQuality();
        countCustomer()
    }, [count, quality, customer]); // Dependency array includes both counts

    return (
        <div className='grid lg:grid-cols-2 bg-gray-100 p-10'>
            <div>
                <p className='lg:text-7xl md:text-6xl text-4xl font-bold'>Express Your Style</p>
                <p className='lg:text-7xl font-bold md:text-6xl text-4xl'>with the Perfect</p>
                <p className='lg:text-7xl font-bold md:text-6xl text-4xl'>Outfit</p>
                <p className='my-3'>Explore our wide selection of carefully curated apparel, tailored to highlight your unique personality and complement your fashion preferences.</p>
                <div className='my-10'>
                    <Link className='bg-black rounded-full p-3 px-7 hover:bg-pink-600 hover:text-white text-white ' to="/login">Shop Now</Link>
                    <div className='flex lg:gap-10 md:gap-10 my-5'>
                        <div>
                            <p className='lg:text-5xl md:text-6xl text-2xl font-bold'>{count.toLocaleString()} +</p>
                            <p>international brands</p>
                        </div>
                        <div>
                            <p className='lg:text-5xl md:text-6xl text-2xl font-bold'>{quality.toLocaleString()} +</p>
                            <p>High Quality Products</p>
                        </div>
                        <div>
                            <p className='lg:text-5xl md:text-6xl text-2xl font-bold'>{customer.toLocaleString()} +</p>
                            <p>Happy Customers</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                {/* <img
                    src={ava1}
                    alt="A representative image"
                    className='rounded-lg shadow-lg w-full max-w-sm'
                /> */}
                <img className='rounded-lg shadow-lg opacity-70 w-full max-w-sm' src="https://plus.unsplash.com/premium_photo-1682095757120-c9abb908ed60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vZGVsfGVufDB8fDB8fHww" alt="" />
            </div>

        </div>
    );
};

export default Homepage;
