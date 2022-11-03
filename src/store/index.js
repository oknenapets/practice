import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import authReducer from './Auth/authSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});
