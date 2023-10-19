import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialstate = {
    isLogin:false,
    idToken : localStorage.getItem('idToken')
}

const authslice = createSlice({
    name:'authentication',
    initialState:initialstate,
    reducers:{
        LogIn(state,action){
            localStorage.setItem('idToken',action.payload)
            state.isLogin = true
            state.idToken = action.payload
        },

        Logout(state){
            state.isLogin = false
            localStorage.removeItem('email')
            localStorage.removeItem('idToken')
        }
    }

})

export const authAction = authslice.actions
export default authslice