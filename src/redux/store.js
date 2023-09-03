import {configureStore} from "@reduxjs/toolkit";
import {userAuthSlice} from './userSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const UserPersistConfig = { key: "userAuth", storage, version: 1 };

const userAuthPersistedReducer = persistReducer(UserPersistConfig,userAuthSlice.reducer);


export const store = configureStore({
    reducer:{
        userAuth : userAuthPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)