import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const userTrackSlice = createSlice({
  name: 'userTrack',
  initialState,
  reducers: {
    getTrackArtwork: (state, action) => {
      console.log('test');
      return action.payload;
    },
    addTrackArtwork: (state, action) => {
      return [...state, action.payload];
    },
    removeTrackArtwork: (state, action) => {
      const index = state.indexOf((item) => item == action.payload);
      const newArr = [...state].splice(index, 1);
      console.log(newArr);
      return newArr;
    },
  },
});

export const { getTrackArtwork, addTrackArtwork, removeTrackArtwork } =
  userTrackSlice.actions;

export default userTrackSlice.reducer;
