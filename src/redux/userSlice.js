import {createSlice} from "@reduxjs/toolkit"

const INITIAL_STATE = {
    name: null,
    email: null,
    token: null,
    profile: null,
    userID:null,
    phoneNumber:null,
    DOB:null,
    emailVerified:false,
}

export const userAuthSlice = createSlice({
    name:'userAuth',
    initialState: INITIAL_STATE,
    reducers:{
        userLogin:(state,action)=>{

            const IsEmailVerified = action.payload.emailVerified ? true : false;
            const IsphoneNumberVerified = action.payload.phoneNumberVerified ? true : false;

            state.name = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.profile = action.payload.profile;
            state.userID = action.payload.userID;
            state.DOB = action.payload.DOB;
            state.phoneNumber = action.payload.phoneNumber;
            state.emailVerified = IsEmailVerified;
            state.phoneNumberVerified = IsphoneNumberVerified;
           
        },
        userLogout : (state)=>{
            state.name = null
            state.email = null
            state.token = null
            state.profile = null
            state.userID = null
            state.phoneNumber = null
            state.emailVerified = false
            state.phoneNumberVerified = false
            state.DOB = null
        }
    }
})

export const {userLogin,userLogout} = userAuthSlice.actions;

export default userAuthSlice.reducer;