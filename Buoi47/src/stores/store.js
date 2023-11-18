import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./slices/taskSlice";
import { columnSlice } from "./slices/columnSlice";
const rootReducer = {
  reducer: {
    column: columnSlice.reducer,
    task: taskSlice.reducer,
  },
};

export const store = configureStore(rootReducer);
