import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    isVisible: false,
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload;
      state.isVisible = true;
    },
    hideNotification: (state) => {
      state.message = "";
      state.isVisible = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
