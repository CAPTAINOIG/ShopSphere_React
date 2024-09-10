import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
  const store = useSelector((state) => state.counterReducer.cart);
  console.log(store);
  
    return (
      <div className="container mx-auto p-6">
        {/* Cart and Checkout Container */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Cart Section */}
          <div className="lg:w-3/5 w-full bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
  
            {/* Cart Items */}
            <div className="space-y-4">
              {/* Example Cart Item */}
              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-4">
                  <img src="https://via.placeholder.com/80" alt="product" className="w-20 h-20 rounded-md" />
                  <div>
                    <h3 className="text-lg font-medium">Product Name</h3>
                    <p className="text-sm text-gray-500">Description</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-pink-600">$99.99</p>
                  <button className="text-sm text-red-500 hover:underline mt-2">Remove</button>
                </div>
              </div>
              {/* Add more cart items here */}
            </div>
          </div>
  
          {/* Checkout Section */}
          <div className="lg:w-2/5 w-full bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
  
            {/* Total Price */}
            <div className="flex justify-between mb-4">
              <p className="text-lg">Subtotal</p>
              <p className="text-lg font-semibold text-pink-600">$199.98</p>
            </div>
  
            <div className="flex justify-between mb-4">
              <p className="text-lg">Shipping</p>
              <p className="text-lg font-semibold text-black">Free</p>
            </div>
  
            <div className="flex justify-between mb-6">
              <p className="text-lg">Total</p>
              <p className="text-lg font-semibold text-pink-600">$199.98</p>
            </div>
  
            {/* Checkout Button */}
            <button className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-black transition-colors font-semibold">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };

export default Cart