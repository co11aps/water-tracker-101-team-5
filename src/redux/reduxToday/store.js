import { configureStore } from "@reduxjs/toolkit";
import todayReducer from "./todaySlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    today: todayReducer,
  },
});
