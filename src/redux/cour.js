import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config-axios.jsx";
import { locale } from "moment";

export const getALLcour = createAsyncThunk(
  "cour/getALLcour",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cour`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getALLcouruser = createAsyncThunk(
  "cour/getALLcouruser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cour/getallcouruser/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getcourbyid = createAsyncThunk(
  "cour/getcourbyid",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cour/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getALLcourformateur = createAsyncThunk(
  "cour/getallcourformateur",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cour/getallcourformateur/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deletecour = createAsyncThunk(
  "cour/deletecour",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cour/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updatecour = createAsyncThunk(
  "cour/updatecour",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cour/${data.id}`, data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createcour = createAsyncThunk(
  "cour/createcour",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`/cour`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchcour = createAsyncThunk(
  'cour/serchcour',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cour/getcoursearch?search=${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    datacour: [],
    datauser: [],
    cour: [],
    dataformateur: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getALLcour.fulfilled]: (state, action) => {
      state.datacour = action.payload;
      state.status = "success";
      state.error = null;
    },
    [getALLcour.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getALLcour.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [searchcour.fulfilled]: (state, action) => {
      state.datacour = action.payload;
      state.status = "success";
      state.error = null;
    },
    [searchcour.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [searchcour.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [getALLcouruser.fulfilled]: (state, action) => {
      state.datauser = action.payload;
      state.status = "success";
      state.error = null;
    },
    [getALLcouruser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getALLcouruser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [getcourbyid.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.cour = action.payload;
      state.status = "success";
      state.error = null;
    },
    [getcourbyid.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getcourbyid.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [getALLcourformateur.fulfilled]: (state, action) => {
      state.dataformateur = action.payload;
      state.status = "success";
      state.error = null;
    },
    [getALLcourformateur.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getALLcourformateur.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [deletecour.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
      state.error = null;
    },
    [deletecour.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [deletecour.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [updatecour.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
      state.error = null;
    },
    [updatecour.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [updatecour.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [createcour.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
      state.error = null;
    },
    [createcour.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [createcour.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
