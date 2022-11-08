import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import authReducer from './Auth/authSlice';
import garageReducer from './Garage/garageSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    garage: garageReducer,
  },
});
