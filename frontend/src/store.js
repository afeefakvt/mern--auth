import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/authSlices'
import { apiSlice } from './features/apiSlice'
import { adminApiSlice } from './features/adminApiSlice'
import adminAuthReducer from './features/adminAuthSlice'; // Admin auth slice


const store = configureStore({
    reducer:{
        auth:authReducer,
        adminAuth:adminAuthReducer, 
        [apiSlice.reducerPath]:apiSlice.reducer,
        [adminApiSlice.reducerPath]:adminApiSlice.reducer,
    

    },  
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware,adminApiSlice.middleware),
    devTools: true,
})

export default store