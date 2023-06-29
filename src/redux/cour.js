import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from "../config-axios.jsx"
 
              export const getALLcour = createAsyncThunk(
                'cour/getALLcour',
                async (data, { rejectWithValue }) => {
                  try {
                    const response = await api.get(`/cour`);
                    return response.data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
           
         
            
            
            
  export const userSlice = createSlice({
    name:'user',
    initialState:{
        data:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
          [getALLcour.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
            state.error =null;
         },
         [getALLcour.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [getALLcour.rejected]:(state,action)=>{
                state.status ="failed";
                state.error=action.payload;
          },
          
    }
})

export default userSlice.reducer