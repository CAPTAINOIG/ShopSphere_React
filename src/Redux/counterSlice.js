import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialCart = () => {
  //  after setting d ifo in our reducer we will collect it and pass it along
  const item = window.localStorage.getItem('cart')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : []

}

export const counterSlice = createSlice({
  name: 'commerce',
  initialState: {
    cart: initialCart(),
    address: {},           
    currentStep: 1, 
  },
  reducers: {
    addToCart: (state, payload) => {
      const addToCart = state.cart.push(payload.payload)
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    increment: (state, action) => {
      let productItem = state.cart.find((item) => item.id === action.payload);
      if (productItem && productItem.cartQuantity < productItem.availableQuantity) {
        toast.success('product added successfully')
        productItem.cartQuantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Update local storage
    },

    decrement: (state, action) => {
      let productItem = state.cart.find((item) => item.id === action.payload);
      if (productItem && productItem.cartQuantity > 1) {
        toast.success('Item quantity has been updated');
        productItem.cartQuantity -= 1;
      }
      else{
        toast.error('Minimum quantity reached');
      }
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Update local storage
    },

    remove: (state, action) => {
      const itemId = action.payload;
      console.log(itemId);
      state.cart.splice(action.payload, 1)
      // Find the index of the item with the matching id
      const itemIndex = state.cart.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        // Remove the item from the cart using splice
        state.cart.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart))
      }
    },

    handleNextStep: (state, action)=>{
      state.address = {...state.address, ...action.payload}
      state.address.currentStep++
    },
    
    handlePreviousStep: (state, action)=>{
      state.address = {...state.address, ...action.payload}
      state.address.currentStep--
    }
  }


  })
export const { addToCart, increment, decrement, remove, handleNextStep, handlePreviousStep } = counterSlice.actions
export default counterSlice.reducer