import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userArtworkSlice = createSlice({
  name: 'artworkEditData',
  initialState,
  reducers: {
    getArtworkData: (state, action) => {
      return [...action.payload];
    },
    createOneArtwork: (state, action) => {
      return [...state, action.payload];
    },
    updateOneArtwork: (state, action) => {
      //change
      const index = state.findIndex((item) => action.payload.id === item.id);
      state.splice(index, 1, { ...state[index], ...action.payload.data });
    },
    deleteOneArtwork: (state, action) => {
      const index = state.findIndex((item) => action.payload.id === item.id);
      state.splice(index, 1);
    },
  },
});

export const {
  getArtworkData,
  createOneArtwork,
  updateOneArtwork,
  deleteOneArtwork,
} = userArtworkSlice.actions;

export default userArtworkSlice.reducer;
