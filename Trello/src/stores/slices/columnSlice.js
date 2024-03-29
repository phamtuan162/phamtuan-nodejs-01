import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../middleware/fetchData";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
const initialState = {
  columns: getLocalStorage("columns") || [],
  status: "idle",
};
export const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    updateColumn: (state, action) => {
      state.columns = action.payload;
      setLocalStorage("columns", action.payload);
    },
    editColumnName: (state, action) => {
      state.columns = state.columns.map((column) => {
        if (column._id === action.payload._id) {
          return {
            ...column,
            columnName: action.payload.columnName,
          };
        }
        return column;
      });
      setLocalStorage("columns", state.columns);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        if (action.payload && action.payload.columns) {
          state.columns = action.payload.columns;
          state.status = "success";
        }
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "error";
      });
  },
});
