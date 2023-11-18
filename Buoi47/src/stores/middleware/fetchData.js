import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../helpers/getData";
export const fetchData = createAsyncThunk("fetchData", async () => {
  const data = await getData();

  return data;
});
