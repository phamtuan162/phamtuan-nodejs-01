import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../middleware/fetchData";
import { setLocalStorage } from "../../utils/localStorage";
const initialState = {
  tasks: localStorage.getItem("tasks") || [],
  status: "idle",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updates: (state, action) => {
      setLocalStorage("tasks", action.payload);
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        if (action.payload && action.payload.tasks) {
          state.tasks = action.payload.tasks;
          state.status = "success";
        }
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "error";
      });
  },
});
