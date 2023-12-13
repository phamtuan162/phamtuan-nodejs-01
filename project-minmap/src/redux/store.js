import { counterSlice } from "./slice/counterSlice";
import { todoSlice } from "./slice/todoSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { postApi } from "./services/postApi";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    todo: todoSlice.reducer,
    // [postApi.reducerPath]: postApi.reducer,
  },
  devTools: true,
  // middleware: (getDefaultMiddleware) => {
  //   // return getDefaultMiddleware().concat(postApi.middleware);
  //   // return [...getDefaultMiddleware(), postApi.middleware];
  // },
});

setupListeners(store.dispatch);
