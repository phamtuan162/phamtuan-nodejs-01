import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../middleware/fetchData";
const initialState = {
  tasks: localStorage.getItem("tasks") || [],
  status: "idle",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updates: (state, action) => {
      state.tasks = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
        state.status = "success";
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "error";
      });
  },
});
