import { configureStore } from '@reduxjs/toolkit';
import { adminReducer } from './reducer';

const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

export default store;
