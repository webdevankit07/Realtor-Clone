import { configureStore } from '@reduxjs/toolkit';
import firebaseSlice from '../features/firebaseSlice';

const store = configureStore({
    reducer: {
        firebase: firebaseSlice,
    },
});

export default store;
