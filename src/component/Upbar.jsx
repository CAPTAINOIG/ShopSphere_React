import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';



const Upbar = ({openToggle, allProducts}) => { 
  console.log("All Products: ", allProducts);
  const navigate = useNavigate();

  const store = useSelector((state) => state.counterReducer.cart);
  // console.log(store.length);
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalProduct, setTotalProduct] = useState('');

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
    setTotalProduct(store.length);
  }, [store.length]);

  const handleCartRoute = () =>{
    navigate('/cart')
  }

  
  return (
    <div className='fixed w-full ms-[-16px] md:ms-[-28px] lg:ms-0 top-0 lg:hidden text-white bg-pink-600 p-5 rounded z-0'>
      <section className='mx-1'>
        <div className='grid grid-cols-2 gap-10 text-center items-center'>
          <Link to="/" className='font-semibold'>Shop</Link>
          <Link to="/features" className='font-semibold'>On Sale</Link>
          <Link to="/pricing" className='font-semibold'>New Arrivals</Link>
          <Link to="/blog" className='font-semibold'>Category</Link>
          <Link to="/about" className='font-semibold'>About</Link>
          <Link to="/contact" className='font-semibold'>Contact</Link>
        </div>
        <div className="flex lg:w-[30%] text-center mx-auto bg-gray-50 mt-5 md:w-[50%] rounded-full h-[40px] items-center gap-4 border border-gray-300 px-3">
            <BsSearch />
            <input
              className="py-2 bg-transparent outline-none text-black px-3 w-[70%] rounded-full"
              type="text"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery && (
            <div className="absolute bg-white w- mt-20 overflow-y-auto h-[300%] p-2 shadow-md rounded-md text-black border border-gray-300">
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

          <div onClick={handleCartRoute} className="flex gap-7 cursor-pointer items-center me-5 relative">
            <FaCartShopping className="mt-5" size={20} />
            <span className="absolute top-5 left-3 bg-pink-600 rounded-full text-[8px] text-white w-4 h-4 flex items-center justify-center">
              {totalProduct}
            </span>
            <Link
              to="/signin"
              className="hidden lg:block border me-5 mt-6 w-[150px] font-semibold border-black text-center py-1 text-black hover:text-white rounded-[6px] hover:bg-black hover:border-black"
            >
              Log in
            </Link>
          </div>
      </section>
    </div>
  );
};

export default Upbar;
