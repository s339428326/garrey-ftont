import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userCartSlice = createSlice({
  name: 'artworkEditData',
  initialState,
  reducers: {
    getCartData: (state, action) => {
      return [...action.payload];
    },
    addCart: (state, action) => {
      return [...state, action.payload];
    },
    deleteCart: (state, action) => {
      const index = [...state].map((item) => item.id).indexOf(action.payload);
      if (index < 0) return state;
      const newCart = [...state];
      newCart.splice(index, 1);
      return newCart;
    },
    cleanCart: (state, action) => {
      return [];
    },
  },
});

export const { getCartData, addCart, deleteCart, cleanCart } =
  userCartSlice.actions;

export default userCartSlice.reducer;
