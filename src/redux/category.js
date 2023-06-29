import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from "../config-axios.jsx"
 
              export const getALLcategory = createAsyncThunk(
                'category/getALLcategory',
                async (data, { rejectWithValue }) => {
                  try {
                    const response = await api.get(`/category`);
                    return response.data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
              export const createcategory = createAsyncThunk(
                'category/createcategory',
                async (data, { rejectWithValue }) => {
                  try {
                    const response = await api.post(`/category`,data);
                    return response.data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
              export const deletecategory = createAsyncThunk(
                'category/deletecategory',
                async (data, { rejectWithValue }) => {
                  try {
                    const response = await api.delete(`/category/${data.id}`);
                    return response.data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
           
         
            
            
            
  export const categorySlice = createSlice({
    name:'category',
    initialState:{
        data:[],
        categroy:[],
        status:null,
        status2:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
          [createcategory.fulfilled]:(state,action)=>{
            state.categroy = action.payload;
            state.status2 ="success";
            state.error =null;
         },
         [createcategory.pending]:(state)=>{
            state.status2 ="loading";
            state.error =null;

         },
         [createcategory.rejected]:(state,action)=>{
                state.status2 ="failed";
                state.error=action.payload;
          },
          [getALLcategory.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
            state.error =null;
         },
         [getALLcategory.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [getALLcategory.rejected]:(state,action)=>{
                state.status ="failed";
                state.error=action.payload;
          },
          [deletecategory.fulfilled]:(state,action)=>{
            state.categroy = action.payload;
            state.status2 ="success";
            state.error =null;
         },
         [deletecategory.pending]:(state)=>{
            state.status2 ="loading";
            state.error =null;

         },
         [deletecategory.rejected]:(state,action)=>{
                state.status2 ="failed";
                state.error=action.payload;
          },
          
    }
})

export default categorySlice.reducer