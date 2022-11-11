import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import authReducer from './Auth/authSlice';
import garageReducer from './Garage/garageSlice';
import applicationsReducer from './Applications/applicationsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    garage: garageReducer,
    application: applicationsReducer,
  },
});
