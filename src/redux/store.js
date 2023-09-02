import {configureStore} from "@reduxjs/toolkit";
import userAuthSlice from './userSlice'

export const store = configureStore({
    reducer:{
        userAuth : userAuthSlice,
    },
})