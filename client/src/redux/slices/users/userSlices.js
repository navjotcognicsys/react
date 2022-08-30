import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";

// Login action

export const loginUserAction = createAsyncThunk("user/login", async (payload,{rejectWithValue,getState,dispatch})=>{
    const config = {
        headers: {
            "Content-Type" : 'application/json',
        }
    }
    try {
        // Make http call here
        const {data}= await axios.post(`${baseURL}/users/login`, payload,config);
        // save data into localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
})

// Register Action

export const registerUserAction = createAsyncThunk("user/register", async (payload,{rejectWithValue,getState,dispatch})=>{
    const config = {
        headers: {
            "Content-Type" : 'application/json',
        }
    }
    try {
        // Make http call here
        const {data}= await axios.post(`${baseURL}/users/register`, payload,config);
        return data
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
})

// slices

// Get user from local storage and return it to the redux store
const getUserLoginFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : undefined

const userSlices = createSlice({
    name: "users",
    initialState: {
        auth: getUserLoginFromLocalStorage,
    },
    extraReducers:(builder)=>{
        // Handle Pending State ( Pending) --- login
        builder.addCase(loginUserAction.pending,(state,action)=>{
            state.userLoading = true;
            state.userAppError = undefined;
            state.userServerError = undefined
        })

        // Handle Success State(Fullfilled)
        builder.addCase(loginUserAction.fulfilled,(state,action)=>{
            state.auth = action?.payload;
            state.userLoading = false;
            state.userAppError = undefined;
            state.userServerError = undefined;
        })

        // Handle rejected State
        builder.addCase(loginUserAction.rejected,(state,action)=>{
            state.userLoading = false;
            state.userAppError = action?.payload?.msg;
            state.userServerError = action?.error?.msg;
        })
        
        // Handle Pending State ( Pending) --- Register
        builder.addCase(registerUserAction.pending,(state,action)=>{
            state.userLoading = true;
            state.userAppError = undefined;
            state.userServerError = undefined
        })

        // Handle Success State(Fullfilled)
        builder.addCase(registerUserAction.fulfilled,(state,action)=>{
            state.auth = action?.payload;
            state.userLoading = false;
            state.userAppError = undefined;
            state.userServerError = undefined;
        })

        // Handle rejected State
        builder.addCase(registerUserAction.rejected,(state,action)=>{
            state.userLoading = false;
            state.userAppError = action?.payload?.msg;
            state.userServerError = action?.error?.msg;
        })


    }
})

export default userSlices.reducer







