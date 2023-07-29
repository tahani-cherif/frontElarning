import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config-axios.jsx";

export const createpdf = createAsyncThunk(
  "pdf/createpdf",
  async (data, { rejectWithValue }) => {
    console.log("1", data);
    try {
      console.log("2", data);
      const response = await api.post("/exercice", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const pdfSlice = createSlice({
  name: "pdf",
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [createpdf.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
      state.error = null;
    },
    [createpdf.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [createpdf.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default pdfSlice.reducer;
