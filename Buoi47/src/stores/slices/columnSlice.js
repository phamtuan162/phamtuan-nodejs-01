import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../services/getData";
const initialState = {
  columns: localStorage.getItem("column") || [],
  status: "idle",
};
export const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    updates: (state, action) => {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.status = "success";
      })
      .addCase(fetchColumns.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const fetchColumns = createAsyncThunk("fetchColumns", async () => {
  const data = await getData();
  if (data) {
    return data.columns;
  } else {
    return [];
  }
});
