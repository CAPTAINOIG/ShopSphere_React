import React from 'react'
import { Link } from 'react-router-dom';
import { FaSquareTwitter, FaFacebook, FaSquareInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import pay from '../assets/image/pay.png';
import paypal from '../assets/image/paypal.png';
import visa from '../assets/image/visa.png';
import gpay from '../assets/image/gpay.png';
import master from '../assets/image/master.png';



const Footer = () => {
  return (
    <div className='bg-gray-800 w-full'>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 p-8 text-white'>
        <div>
          <div className="flex items-center mt-[-2px]">
            <Link to="/">
              <span className="text-2xl hover:text-pink-600 font-bold text-white mr-2">shopping</span>
              <span className="text-xl hover:text-pink-600 font-semibold text-pink-600">.co</span>
            </Link>
          </div>
          <p className='my-3 hover:text-pink-600'>We offer stylish clothes that you’ll love to wear, tailored for both women and men."</p>
          <ul className='flex gap-5'>
            <li className="hover:text-pink-600"><FaFacebook /></li>
            <li className="hover:text-pink-600"><FaSquareInstagram /></li>
            <li className="hover:text-pink-600"><FaSquareTwitter /></li>
            <li className="hover:text-pink-600"><IoLogoYoutube /></li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold mb-2 hover:text-pink-600'>Customer Service</h3>
          <ul>
            <li className="hover:text-pink-600">Help Center</li>
            <li className="hover:text-pink-600">Track Order</li>
            <li className="hover:text-pink-600">Returns</li>
            <li className="hover:text-pink-600">Shipping Info</li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold mb-2 hover:text-pink-600'>About Us</h3>
          <ul>
            <li className="hover:text-pink-600">Our Story</li>
            <li className="hover:text-pink-600">Careers</li>
            <li className="hover:text-pink-600">Press</li>
            <li className="hover:text-pink-600">Blog</li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold mb-2 hover:text-pink-600'>Categories</h3>
          <ul>
            <li className="hover:text-pink-600">Men</li>
            <li className="hover:text-pink-600">Women</li>
            <li className="hover:text-pink-600">Electronics</li>
            <li className="hover:text-pink-600">Accessories</li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold mb-2 hover:text-pink-600'>Contact</h3>
          <ul>
            <li className="hover:text-pink-600">Email: support@example.com</li>
            <li className="hover:text-pink-600">Phone: +123 456 7890</li>
            <li className="hover:text-pink-600">Address: 123 Main St, City</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="lg:flex justify-between mt-5 p-5">
  {/* Logo Section */}
  <div className="flex items-center gap-5">
    <Link to="/">
      <span className="text-2xl font-bold text-white mr-2">shopping</span>
      <span className="text-xl font-semibold text-pink-600">.co</span>
    </Link>
    <p className="text-white mt-2">2000 - 2024</p>
  </div>

  {/* Payment Methods Section */}
  <div className="flex flex-wrap justify-center lg:justify-end gap-3 mt-5 lg:mt-0">
    <img src={pay} alt="Pay" className="w-12 h-12 object-contain" />
    <img src={paypal} alt="PayPal" className="w-12 h-12 object-contain" />
    <img src={master} alt="MasterCard" className="w-12 h-12 object-contain" />
    <img src={visa} alt="Visa" className="w-12 h-12 object-contain" />
    <img src={gpay} alt="Google Pay" className="w-12 h-12 object-contain" />
  </div>
</div>

    </div>
  )
}

export default Footer
