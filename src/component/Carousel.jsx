import React from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {

  return (
    <div className="">
      <div className='bg-black space-x-5 text-white p-2 text-center'>
        <span className='animate animate-pulse'>
          Discover our latest collection of exclusive products! Enjoy special discounts and offers tailored just for you. Shop now and elevate your style!
        </span>
        <span>
          <Link className='underline' to="/login">Log in</Link>
        </span>
      </div>
    </div>

  );
};

export default Carousel;
