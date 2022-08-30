import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";

// Create Category Action

export const createCategoryAction = createAsyncThunk("category/create", async (payload,{rejectWithValue,getState,dispatch})=>{
    const config = {
        headers: {
            "Content-Type" : 'application/json',
        }
    }
    try {
        // Make http call here
        const {data}= await axios.post(`${baseURL}/categories`, payload,config);
        return data
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
})

//Fetch All Category Action

export const fetchAllCategoryAction = createAsyncThunk("category/fetch", async (payload,{rejectWithValue,getState,dispatch})=>{
    const config = {
        headers: {
            "Content-Type" : 'application/json',
        }
    }
    try {
        // Make http call here
        const {data}= await axios.get(`${baseURL}/categories`, payload,config);
        return data
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
})

// Create Slice

const categorySlices = createSlice({
    name : 'categories',
    initialState : {},
    extraReducers : (builder)=>{
        // cretae category
        builder.addCase(createCategoryAction.pending, 
            (state,action)=>{
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            }
        );

        builder.addCase(createCategoryAction.fulfilled, 
            (state,action)=>{
                state.loading = false;
                state.categoryCreated = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            }
        );
        builder.addCase(createCategoryAction.rejected, 
            (state,action)=>{
                state.loading = true;
                state.appErr = action?.payload?.msg;
                state.serverErr = action?.error?.msg;
            }
        );

        // fetch all  Transaction
        builder.addCase(fetchAllCategoryAction.pending, 
            (state,action)=>{
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            }
        );

        builder.addCase(fetchAllCategoryAction.fulfilled, 
            (state,action)=>{
                state.loading = false;
                state.categoryList = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            }
        );
        builder.addCase(fetchAllCategoryAction.rejected, 
            (state,action)=>{
                state.loading = true;
                state.appErr = action?.payload?.msg;
                state.serverErr = action?.error?.msg;
            }
        );
    }
})

export default categorySlices.reducer;