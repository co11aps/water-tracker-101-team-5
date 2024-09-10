import { createSlice } from "@reduxjs/toolkit";
import {
  getDailyWater,
  getMonthlyWater,
  addWater,
  updateWater,
  deleteWater,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilled = (state) => {
  state.isLoading = false;
  state.error = null;
};

const waterSlice = createSlice({
  name: "water",
  initialState: {
    dailyWater: {
      percentage: 0,
      waterIntakes: [],
    },
    monthlyWater: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDailyWater.pending, handlePending)
      .addCase(getDailyWater.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.dailyWater = action.payload;
      })
      .addCase(getDailyWater.rejected, handleRejected)

      .addCase(getMonthlyWater.pending, handlePending)
      .addCase(getMonthlyWater.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.monthlyWater = action.payload;
      })
      .addCase(getMonthlyWater.rejected, handleRejected)

      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, handleFulfilled)
      .addCase(addWater.rejected, handleRejected)

      .addCase(updateWater.pending, handlePending)
      .addCase(updateWater.fulfilled, handleFulfilled)
      .addCase(updateWater.rejected, handleRejected)

      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, handleFulfilled)
      .addCase(deleteWater.rejected, handleRejected);
  },
});

export const waterReducer = waterSlice.reducer;
