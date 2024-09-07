import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaCartShopping } from "react-icons/fa6";



const Upbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Handle search logic here
  };
  return (
    <div className='fixed w-full ms-[-30px] mt-[-30px] lg:hidden bg-white p-5 rounded' style={{ zIndex: '2' }}>
      <section className='mx-1'>
        <div className='grid grid-cols-2 gap-2 justify-center items-center'>
          <Link to="/" className='font-semibold'>Shop</Link>
          <Link to="/features" className='font-semibold'>On Sale</Link>
          <Link to="/pricing" className='font-semibold'>New Arrivals</Link>
          <Link to="/blog" className='font-semibold'>Category</Link>
          <Link to="/about" className='font-semibold'>About</Link>
          <Link to="/contact" className='font-semibold'>Contact</Link>
        </div>
        <div className="flex lg:w-[30%] bg-gray-50 mt-5 md:w-[50%] rounded-full h-[40px] items-center gap-4 border border-gray-300 px-3">
            <BsSearch />
            <input
              className="py-2 bg-transparent outline-none px-3 w-[70%] rounded-full"
              type="text"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='flex gap-2'>
            <FaCartShopping className='mt-8' />
            <FaCartShopping className='mt-8' />
            <Link to="/signin" className='border mt-6 w-[150px] font-semibold border-black hover:border-black text-center py-1 text-black hover:text-white rounded-[6px] hover:bg-black'>Log in</Link>
          </div>
          
      </section>
    </div>
  );
};

export default Upbar;
