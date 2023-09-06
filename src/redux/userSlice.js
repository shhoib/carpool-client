import {createSlice} from "@reduxjs/toolkit"

const INITIAL_STATE = {
    name: null,
    email: null,
    token: null,
    profile: null,
    emailVerified:false,
    userID:null
}

export const userAuthSlice = createSlice({
    name:'userAuth',
    initialState: INITIAL_STATE,
    reducers:{
        userLogin:(state,action)=>{
            const ISverified = action.payload.emailVerified ? true : false;

            state.name = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.profile = action.payload.profile;
            state.userID = action.payload.userID;
            state.emailVerified = ISverified;
        },
        userLogout : (state)=>{
            state.name = null
            state.email = null
            state.token = null
            state.profile = null
            state.userID = null
        }
    }
})

export const {userLogin,userLogout} = userAuthSlice.actions;

export default userAuthSlice.reducer;