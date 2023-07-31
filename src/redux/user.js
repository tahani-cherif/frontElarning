import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from "../config-axios.jsx"
 
              export const login = createAsyncThunk(
                'user/loginuser',
                async (data, { rejectWithValue }) => {
                  try {
                    const { email,password} = data;
                    const response = await api.post(`/auth/login`,{
                      email,password
                    });
                    return response;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
              export const updatepassword = createAsyncThunk(
                'user/updatepassword',
                async (data, { rejectWithValue }) => {
                  try {
                    const response = await api.put(`/user`,data);
                    return response.data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );

              export const signup  = createAsyncThunk(
                'user/signup ',
                async (data, { rejectWithValue }) => {
                  try {
                    const response = await api.post(`/user`,data);
                    return response.data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
              export const passwordrecovery = createAsyncThunk(
                'user/passwordrecovery',
                async (data, { rejectWithValue }) => {
                  try {
                    const response = await api.post(`/auth/passwordrecovery`,data);
                    return response.data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
              export const gettAllUser = createAsyncThunk(
                'user/gettAllUser',
                async (data, { rejectWithValue }) => {
                  try {
                    const response = await api.get(`/user`);
                    return response.data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
              export const updateuser = createAsyncThunk(
                'user/updateuser',
                async (data, { rejectWithValue }) => {
                  try {
                    const response = await api.put(`/user/${data._id}`,data.data);
                    return response.data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );
           
              export const sendemailcontact = createAsyncThunk(
                'user/sendemailcontact',
                async (data, { rejectWithValue }) => {
                  try {
                    const response = await api.post(`/auth/contact`,data);
                    return response.data;
                  } catch (error) {
                    return rejectWithValue(error.response.data);
                  }
                }
              );     
            
            
            
  export const userSlice = createSlice({
    name:'user',
    initialState:{
        alldata:[],
        data:[],
        user:[],
        status:null,
        statuslogin:null,
        statussignup:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
      [sendemailcontact.fulfilled]:(state,action)=>{
        state.data = action.payload;
        state.statuslogin ="success";
        state.error =null;
     },
     [sendemailcontact.pending]:(state)=>{
        state.statuslogin ="loading";
        state.error =null;

     },
     [sendemailcontact.rejected]:(state,action)=>{
            state.statuslogin ="failed";
            state.error=action.payload;
      },
        [login.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.statuslogin ="success";
            state.error =null;
         },
         [login.pending]:(state)=>{
            state.statuslogin ="loading";
            state.error =null;

         },
         [login.rejected]:(state,action)=>{
                state.statuslogin ="failed";
                state.error=action.payload;
          },
          [signup.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.statussignup ="success";
            state.error =null;
         },
         [signup.pending]:(state)=>{
            state.statussignup ="loading";
            state.error =null;

         },
         [signup.rejected]:(state,action)=>{
                state.statussignup ="failed";
                state.error=action.payload;
          },
        [updatepassword.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status2 ="success";
            state.error =null;
         },
         [updatepassword.pending]:(state)=>{
            state.status2 ="loading";
            state.error =null;

         },
         [updatepassword.rejected]:(state,action)=>{
                state.status2 ="failed";
                state.error=action.payload;
          },
          [passwordrecovery.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.statuslogin ="success";
            state.error =null;
         },
         [passwordrecovery.pending]:(state)=>{
            state.statuslogin ="loading";
            state.error =null;

         },
         [passwordrecovery.rejected]:(state,action)=>{
                state.statuslogin ="failed";
                state.error=action.payload;
          },
          [gettAllUser.fulfilled]:(state,action)=>{
            state.alldata = action.payload;
            state.status ="success";
            state.error =null;
         },
         [gettAllUser.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [gettAllUser.rejected]:(state,action)=>{
                state.status ="failed";
                state.error=action.payload;
          },
          [updateuser.fulfilled]:(state,action)=>{
            state.user = action.payload;
            state.statuslogin ="success";
            state.error =null;
         },
         [updateuser.pending]:(state)=>{
            state.statuslogin ="loading";
            state.error =null;

         },
         [updateuser.rejected]:(state,action)=>{
                state.statuslogin ="failed";
                state.error=action.payload;
          },
          
    }
})

export default userSlice.reducer