import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';

export const store = configureStore({

    reducer: { user: userSlice },   //  Set Reducer

    middleware: (getDefaultMiddleware) =>
        
        getDefaultMiddleware({
        
            serializableCheck: false,
            
        }),

});