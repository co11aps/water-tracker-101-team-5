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

const handleUpdateWater = (state, action) => {
  const index = state.dailyWater.findIndex(
    (item) => item.id === action.payload.id
  );

  state.dailyWater[index] = action.payload;
};

const handleDeleteWater = (state, action) => {
  const index = state.dailyWater.findIndex(
    (item) => item.id === action.payload.id
  );

  state.splice(index, 1);
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
      .addCase(addWater.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.dailyWater.push(action.payload);
      })
      .addCase(addWater.rejected, handleRejected)

      .addCase(updateWater.pending, handlePending)
      .addCase(updateWater.fulfilled, (state, action) => {
        handleFulfilled(state);
        handleUpdateWater(state, action);
      })
      .addCase(updateWater.rejected, handleRejected)

      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        handleFulfilled(state);
        handleDeleteWater(state, action);
      })
      .addCase(deleteWater.rejected, handleRejected);
  },
});

export const waterReducer = waterSlice.reducer;
