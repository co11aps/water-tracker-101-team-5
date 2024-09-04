import { createSlice } from "@reduxjs/toolkit";
import { getDailyWater } from "./operations";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDailyWater.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDailyWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getDailyWater.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const waterReducer = waterSlice.reducer;
