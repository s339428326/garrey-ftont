import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userArtworkReducer from '../features/userArtwork/userArtworkSlice';
import userCartReducer from '../features/userCart/userCartSlice';
import userTrackReducer from '../features/userTrack/userTrackSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userArtwork: userArtworkReducer,
    userCart: userCartReducer,
    userTrack: userTrackReducer,
  },
});
