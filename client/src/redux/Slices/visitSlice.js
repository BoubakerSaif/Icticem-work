import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const createVisit = createAsyncThunk(
  "visit/createVisit",
  async ({ visitData, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.createVisit(visitData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getVisits = createAsyncThunk(
  "visit/getVisits",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.getVisits();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getVisit = createAsyncThunk(
  "visit/getvisit",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getVisit(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteVisit = createAsyncThunk(
  "visit/deleteVisit",
  async ({ id }, { rejectWithValue }) => {
    console.log(id);

    try {
      const { data } = await api.deleteVisit(id);
      window.location.reload();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateVisit = createAsyncThunk(
  "visit/updatedVisit",
  async ({ id, updatedVisitData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updatedVisit(updatedVisitData, id);
      toast.success(" visit Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const visitSlice = createSlice({
  name: "visit",
  initialState: {},

  extraReducers: {
    [createVisit.pending]: (state, action) => {
      state.loading = true;
    },
    [createVisit.fulfilled]: (state, action) => {
      state.loading = false;
      state.createdVisit = action?.payload;
    },
    [createVisit.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [getVisits.pending]: (state, action) => {
      state.loading = true;
    },
    [getVisits.fulfilled]: (state, action) => {
      state.loading = false;
      state.AllVisits = action?.payload;
    },
    [getVisits.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },

    [getVisit.pending]: (state, action) => {
      state.loading = true;
    },
    [getVisit.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleVisit = action?.payload;
    },
    [getVisit.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },

    [deleteVisit.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteVisit.fulfilled]: (state, action) => {
      state.loading = false;
      state.deletedVisit = action?.payload;
    },
    [deleteVisit.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [updateVisit.pending]: (state, action) => {
      state.loading = true;
    },
    [updateVisit.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userVisits = state.userVisits.map((item) =>
          item._id === id ? action.payload : item
        );
        state.visits = state.visits.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateVisit.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default visitSlice.reducer;
