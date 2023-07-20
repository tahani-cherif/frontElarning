import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from "../config-axios.jsx"
 
              export const getVideoByCour = createAsyncThunk(
                'video/getVideoByCour',
                async (data, { rejectWithValue }) => {
                  try {
                    const response = await api.get(`/video/bycour/${data}`);
                    return response.data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
           
            
  export const videoSlice = createSlice({
    name:'video',
    initialState:{
        data:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
          [getVideoByCour.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
            state.error =null;
         },
         [getVideoByCour.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [getVideoByCour.rejected]:(state,action)=>{
                state.status ="failed";
                state.error=action.payload;
          },

          
    }
})

export default videoSlice.reducer