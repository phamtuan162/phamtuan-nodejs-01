import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../services/getData";
export const fetchData = createAsyncThunk("fetchData", async () => {
  const data = await getData();
  if (data) {
    return data;
  }
});
