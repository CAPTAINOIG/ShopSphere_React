import React, { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import Upbar from './Upbar';
import Carousel from './Carousel';
import { BsSearch } from 'react-icons/bs';
import { FaCartShopping } from 'react-icons/fa6';

const Navbar = ({ openToggle, allProducts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    if (searchQuery) {
      const results = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || !dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  const location = useLocation();
  const hiddenRoutes = ['/layout/home'];
  const isHidden = hiddenRoutes.some(route => location.pathname.startsWith(route));

  return isHidden ? null : (
    <>
      <Carousel />
      <nav className='m-0 lg:ps-10 shadow w-full sticky top-0 bg-white py-2 z-[1000]'>
        <div className='flex justify-between lg:mx-0 md:mx-5 mx-2'>
          <div className="flex items-center">
            <Link to="/" className='mt-2'>
              <span className="text-2xl font-bold text-gray-800 mr-2">shopping</span>
              <span className="text-xl font-semibold text-pink-600">.co</span>
            </Link>
          </div>
          <div className='mt-6 hidden lg:block'>
            <ul className='flex mx-4 justify-between gap-10'>
              <li className='font-semibold'>
                <Link to="/" className='hover:text-pink-600 hover:font-bold'>Shop</Link>
              </li>
              <li className='font-semibold'>
                <a href="#" className='hover:text-pink-600 hover:font-bold'>On Sale</a>
              </li>
              <li className='font-semibold'>
                <a href="#" className='hover:text-pink-600 hover:font-bold'>New Arrivals</a>
              </li>
              <li className='font-semibold'>
                <a href="#" className='hover:text-pink-600 hover:font-bold'>Category</a>
              </li>
            </ul>
          </div>
          <div className="lg:flex md:hidden hidden lg:w-[30%] bg-gray-50 mt-5 md:w-[50%] rounded-full h-[40px] items-center gap-4 border border-gray-300 px-3">
            <BsSearch className='hidden lg:block' />
            <input
              className="hidden lg:block md:hidden py-2 bg-transparent outline-none px-3 w-[70%] rounded-full"
              type="text"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery && (
            <div className="absolute bg-white w- mt-20 overflow-y-auto h-[300%] p-2 shadow-md rounded-md border border-gray-300">
              {filteredProducts.length > 0 ? (
                <ul>
                  {filteredProducts.map((product) => (
                    <li key={product._id} className="py-2 px-4 cursor-pointer hover:bg-gray-100">
                      <Link to={'/'} onClick={() => setSearchQuery('')}>
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-2 px-4">No products found</p>
              )}
            </div>
          )}


          <div className='flex gap-2'>
            <FaCartShopping className='mt-8 hidden lg:block' />
            <Link to="/signin" className='hidden lg:block border me-5 mt-6 w-[150px] font-semibold border-black hover:border-black text-center py-1 text-black hover:text-white rounded-[6px] hover:bg-black'>Log in</Link>
          </div>

          <button ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)} className='lg:hidden block mt-1 text-green-700 font-bold'>
            {openToggle ? <FaBars /> : <IoMdClose />}
          </button>
          {dropdownOpen && (
            <div ref={dropdown} className="absolute bg-white w-48 mt-2 p-2 shadow-md lg:hidden">
              <Upbar />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;