import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/authSlice';

const store = configureStore({
    reducer:{
        userState: userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;