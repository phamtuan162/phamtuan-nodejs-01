import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../services/getData";
const initialState = {
  tasks: localStorage.getItem("tasks") || [],
  status: "idle",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updates: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = "success";
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  const data = await getData();
  if (data) {
    return data.tasks;
  } else {
    return [];
  }
});
