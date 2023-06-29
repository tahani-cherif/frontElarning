import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
              export const addtocart = createAsyncThunk(
                'cart/addtocart',
                async (data, { rejectWithValue }) => {
                  try {
                    return data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
              export const supptocart = createAsyncThunk(
                'cart/supptocart',
                async (data, { rejectWithValue }) => {
                  try {
                    return data.filter(item=>item._id !=data._id ? true : false);
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
            

         
  export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        datacart:[],
        status:null,
        error:null,
    },
    reducers:{
        deletetocart(state,action){
            const  newitem=action.payload;
             state.datacart= state.datacart.filter((item)=>item._id!==newitem._id);
          },
          affichepanier(state,action){
            state.datacart=state.datacart;
 }
    },
    extraReducers:{
        [addtocart.fulfilled]:(state,action)=>{
            state.datacart = action.payload;
            state.status ="success";
            state.error =null;
         },
         [addtocart.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [addtocart.rejected]:(state,action)=>{
                state.status ="failed";
                state.error=action.payload;
          },
          [supptocart.fulfilled]:(state,action)=>{
            state.datacart = action.payload;
            state.status ="success";
            state.error =null;
         },
         [supptocart.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [supptocart.rejected]:(state,action)=>{
                state.status ="failed";
                state.error=action.payload;
          },
    }
})
export const cartaction=cartSlice.actions;
export default cartSlice.reducer