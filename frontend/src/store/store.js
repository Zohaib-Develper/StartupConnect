import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import investmentReducer from './slices/investmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    investments: investmentReducer,
  },
});

export default store;
