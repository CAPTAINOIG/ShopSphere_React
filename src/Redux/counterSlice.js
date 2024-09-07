import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice ({
  name: 'commerce',
  initialState: {
    cart: []
  },
    reducers: {
        addToCart: (state, payload) => {
         state.cart.push(payload.payload)
        }
    }
})
export const {addToCart} = counterSlice.actions
export default counterSlice.reducer