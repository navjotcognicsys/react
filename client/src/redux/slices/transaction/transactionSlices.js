import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";

// create Transaction Action

export const createTransactionAction = createAsyncThunk("transaction/create", async (payload,{rejectWithValue,getState,dispatch})=>{

    // Get user token from store
    const userToken = getState()?.users?.auth?.token;

    const config = {
        headers: {
            "Content-Type" : 'application/json',
            Authorization : `Bearer ${userToken}`,
        }
    }
    try {
        // Make http call here
        const {data}= await axios.post(`${baseURL}/transaction`, payload,config);
        return data
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
})

//Fetch all transactions Action

export const fetchAllTransactionAction = createAsyncThunk("transaction/fetch", async (payload,{rejectWithValue,getState,dispatch})=>{

    // Get user token from store
    const userToken = getState()?.users?.auth?.token;

    const config = {
        headers: {
            "Content-Type" : 'application/json',
            Authorization : `Bearer ${userToken}`,
        }
    }
    try {
        // Make http call here
        const {data}= await axios.get(`${baseURL}/transaction?page=${payload}`, config);
        return data
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
})

// Create Slice

const transactionSlices = createSlice({
    name : 'transactions',
    initialState : {},
    extraReducers : (builder)=>{
        // cretae Transaction
        builder.addCase(createTransactionAction.pending, 
            (state,action)=>{
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            }
        );

        builder.addCase(createTransactionAction.fulfilled, 
            (state,action)=>{
                state.loading = false;
                state.transactionCreated = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            }
        );
        builder.addCase(createTransactionAction.rejected, 
            (state,action)=>{
                state.loading = true;
                state.appErr = action?.payload?.msg;
                state.serverErr = action?.error?.msg;
            }
        );
        
        // Fetch All Transaction
        builder.addCase(fetchAllTransactionAction.pending, 
            (state,action)=>{
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            }
        );

        builder.addCase(fetchAllTransactionAction.fulfilled, 
            (state,action)=>{
                state.loading = false;
                state.transactionList = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            }
        );
        builder.addCase(fetchAllTransactionAction.rejected, 
            (state,action)=>{
                state.loading = true;
                state.appErr = action?.payload?.msg;
                state.serverErr = action?.error?.msg;
            }
        );

    
    }
})

export default transactionSlices.reducer;