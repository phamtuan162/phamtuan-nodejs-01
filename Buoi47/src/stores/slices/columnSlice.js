import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../middleware/fetchData";
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
      .addCase(fetchData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.columns = action.payload.columns;
        state.status = "success";
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "error";
      });
  },
});
