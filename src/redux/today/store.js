import { configureStore } from "@reduxjs/toolkit";
import todayReducer from "./todaySlice";

export const store = configureStore({
  reducer: {
    today: todayReducer,
  },
});
