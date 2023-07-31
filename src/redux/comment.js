import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config-axios.jsx";

export const getcommentbyvideo = createAsyncThunk(
  "pdf/getcommentbyvideo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/commentaire/video/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addcomment = createAsyncThunk(
    "pdf/addcomment",
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.post("/commentaire", data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
export const suppcomment = createAsyncThunk(
    "pdf/suppcomment",
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.delete(`/commentaire/${data}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const modifcomment = createAsyncThunk(
    "pdf/modifcomment",
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.put(`/commentaire/${data._id}`, {text:data.text});
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    datacomment: [],
    data: [],
    status: null,
    statuscomment: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getcommentbyvideo.fulfilled]: (state, action) => {
      state.datacomment = action.payload;
      state.statuscomment = "success";
      state.error = null;
    },
    [getcommentbyvideo.pending]: (state) => {
      state.statuscomment = "loading";
      state.error = null;
    },
    [getcommentbyvideo.rejected]: (state, action) => {
      state.statuscomment = "failed";
      state.error = action.payload;
    },
    [addcomment.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.status = "success";
        state.error = null;
      },
      [addcomment.pending]: (state) => {
        state.status = "loading";
        state.error = null;
      },
      [addcomment.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      },
      [modifcomment.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.status = "success";
        state.error = null;
      },
      [modifcomment.pending]: (state) => {
        state.status = "loading";
        state.error = null;
      },
      [modifcomment.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      },
      [suppcomment.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.status = "success";
        state.error = null;
      },
      [suppcomment.pending]: (state) => {
        state.status = "loading";
        state.error = null;
      },
      [suppcomment.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      },
  },
});

export default commentSlice.reducer;
