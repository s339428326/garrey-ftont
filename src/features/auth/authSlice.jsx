import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  NoneData: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload, NoneData: false, isAuth: true };
    },
    updateAuth: (state, action) => {
      return {
        ...state,
        ...action.payload,
        NoneData: false,
        isAuth: action.payload,
      };
    },
    resetUserData: () => {
      //remove invalided token
      document.cookie =
        'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      return {
        isAuth: false,
        NoneData: false,
      };
    },
  },
});

export const { updateUserData, updateAuth, resetUserData } = authSlice.actions;

export default authSlice.reducer;
