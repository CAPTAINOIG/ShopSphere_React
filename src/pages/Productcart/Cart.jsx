import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, remove } from '../../Redux/counterSlice';
import { toast } from 'react-toastify';
import Footer from '../../component/Footer';
import './Cart.css'
import Tops from '../../category/Tops';
import { IoGridSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import carty from '../../assets/image/carty.png'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

const Cart = () => {
  // Here, i will be sending userdetails and their cart to backend at the onclick of checkout button then the button check for token exp also.
  const store = useSelector((state) => state.counterReducer.cart);
  // console.log(store);
  // Retrieve user details and cart from local storage
  const navigate = useNavigate()

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  // console.log('userDetails', userDetails);

  const cart = JSON.parse(localStorage.getItem("cart"));
  // console.log('cart', cart);

  const shoppinToken = JSON?.parse(localStorage?.getItem('shoppinToken'));
  // console.log('shoppinToken', shoppinToken);

  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [cartQuantity, setCartQuantity] = useState([])

  useEffect(() => {
    cartDetails();
  }, [store]);

  const cartDetails = () => {
    setCartData(store);
  };

  const handleIncrement = (itemId) => {
    // console.log(itemId);
    dispatch(increment(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrement(itemId));
  };

  useEffect(() => {
    const updatedCartQuantity = store.reduce((total, store) => total + store.cartQuantity * store.price, 0);
    console.log(updatedCartQuantity);
    localStorage.setItem('shoppinsphereCartTotal', JSON.stringify(updatedCartQuantity))
    setCartQuantity(updatedCartQuantity)
  }, [store]);

  const handleRemove = (index) => {
    // console.log(index);

    // Show a toast to confirm removal
    toast(
      <div>
        <p>Are you sure you want to remove this item?</p>
        <button onClick={() => {
          dispatch(remove(index));
          toast.dismiss();
          toast.success('Item removed successfully');
        }} className="bg-red-500 text-white px-3 py-1 rounded mt-2">
          Yes, Remove
        </button>
        <button onClick={() => toast.dismiss()} className="bg-gray-500 text-white px-3 py-1 rounded mt-2 ml-2"
        >
          Cancel
        </button>
      </div>,
      {
        autoClose: false,
      }
    );
  };


  const handleCheckout = async () => {
    if (!shoppinToken) {
      toast.error('You must be signed in to add items to your cart.');
      console.log('User is not logged in.');
       navigate('/login');
      return;
    }
    const checkoutData = {
      user: userDetails,
      cart: cart,
      totalAmount: cartQuantity
    };
    console.log(checkoutData);

    try {
      const response = await axiosInstance.post('/checkout', checkoutData)
      console.log(response);
      
      toast.success(`${response.data.message}`)
    } catch (error) {
      console.log(error);
      toast(`${response.data.messeage}`)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 sm:p-6">
      {store.length > 0 ?
        <>
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div id="folder" className="lg:w-3/5 w-full bg-gray-100 overflow-y-auto max-h-[500px] p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your Cart ({store?.length})</h2>
              <div className="flex justify-end mb-4 space-x-2">

                <IoGridSharp onClick={() => setViewMode('list')} className='cursor-pointer' />
                <FaList onClick={() => setViewMode('grid')} className='cursor-pointer text-pink-500' />
              </div>

              {/* Cart Items */}
              {cartData.length === 0 ? (
                <p className="text-center text-lg font-semibold">No product found</p>
              ) : (
                <div className={viewMode === 'list' ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
                  {cartData.map((item, i) => (
                    <div
                      key={i}
                      className={`flex ${viewMode === 'list' ? 'justify-between bg-white shadow-lg rounded p-4 sm:p-5 items-center' : 'flex-col bg-white rounded shadow-lg p-5 '} border-b pb-4`}
                    >
                      <div className={`${viewMode === 'list' ? 'flex items-center gap-4' : 'text-center'}`}>
                        <img
                          src={item?.image1}
                          alt="product"
                          className={` ${viewMode === 'list' ? 'w-20 h-20 sm:w-24 sm:h-24 rounded-md' : 'w-full h-40 rounded'}`}
                        />
                        <div>
                          <h3 className="text-base sm:text-lg font-medium">Product: {item?.name}</h3>
                          {/* <p className="text-sm text-gray-500">Description: {item?.description}</p> */}
                          <p className="text-sm text-pink-600">Quantity: {item?.cartQuantity}</p>
                        </div>
                      </div>

                      {/* Price and Quantity Controls */}
                      <div className={`${viewMode === 'list' ? 'text-right' : 'flex flex-col items-center'}`}>
                        <p className="text-lg font-semibold text-pink-600">${item?.price}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => handleDecrement(item?.id)}
                            disabled={item?.cartQuantity === 1}
                            className={`px-2 py-1 rounded ${item.cartQuantity === 1 ? 'bg-pink-100' : 'bg-gray-200 hover:bg-gray-300'}`}
                          >
                            -
                          </button>
                          <p className="text-pink-600">{item?.cartQuantity}</p>
                          <button
                            onClick={() => handleIncrement(item?.id)}
                            disabled={item.availableQuantity === item?.cartQuantity}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <button onClick={() => handleRemove(item?.id)} className="text-red-500 hover:underline mt-2 ">
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Section */}
            <div className="lg:w-2/5 w-full bg-white p-4 sm:p-6 rounded-lg h-full shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Checkout</h2>

              {/* Total Price */}
              <div className="flex justify-between mb-4">
                <p className="text-lg">Subtotal</p>
                <p className="text-lg font-semibold text-pink-600">${cartQuantity}</p>
              </div>

              <div className="flex justify-between mb-4">
                <p className="text-lg">Shipping</p>
                <p className="text-lg font-semibold text-black">Free</p>
              </div>

              <div className="flex justify-between mb-6">
                <p className="text-lg">Total</p>
                <p className="text-lg font-semibold text-pink-600">${cartQuantity}</p>
              </div>

              <button onClick={() => handleCheckout()} className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-black transition-colors font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
        :
        <div className="text-center shadow-lg border border-white bg-white">
          <p className="text-xl mt-[5%]">Your cart is empty</p>
          <img src={carty} alt="Empty Cart" className="w-60 h-40 mx-auto mt-[80px] animate-bounce" />
          <button className='bg-pink-500 p-2 mb-5 rounded text-white'>START SHOPPING</button>
        </div>
      }
      <Tops />
      <Footer />
    </div>

  );
};

export default Cart;
