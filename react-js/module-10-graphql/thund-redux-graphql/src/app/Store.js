import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/crud/crudSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
    },
});
