import {createSlice} from "@reduxjs/toolkit"

const INITIAL_STATE = {
    name: null,
    email: null,
    token: null,
}

export const userAuthSlice = createSlice({
    name:'userAuth',
    initialState: INITIAL_STATE,
    reducers:{
        userLogin:(state,action)=>{
            state.name = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token
            console.log(state.name);
            console.log(state.email);
            console.log(state.token);
        }
    }
})

export const {userLogin} = userAuthSlice.actions;

export default userAuthSlice.reducer;