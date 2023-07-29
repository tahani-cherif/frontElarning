import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config-axios.jsx";

export const getVideoByCour = createAsyncThunk(
  "video/getVideoByCour",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/video/bycour/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addVideo = createAsyncThunk(
  "video/addVideo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`/video/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getVideoByid = createAsyncThunk(
  "video/getVideoByid",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/video/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updatevideo = createAsyncThunk(
  "video/updatevideo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`/video/${data.id}`, data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    data: [],
    datavideo: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getVideoByCour.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
      state.error = null;
    },
    [getVideoByCour.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getVideoByCour.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [addVideo.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
      state.error = null;
    },
    [addVideo.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [addVideo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [getVideoByid.fulfilled]: (state, action) => {
      state.datavideo = action.payload;
      state.status = "success";
      state.error = null;
    },
    [getVideoByid.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getVideoByid.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [updatevideo.fulfilled]: (state, action) => {
      state.datavideo = action.payload;
      state.status = "success";
      state.error = null;
    },
    [updatevideo.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [updatevideo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default videoSlice.reducer;
