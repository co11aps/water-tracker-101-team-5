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

// const handleUpdateWater = (state, action) => {
//   const index = state.dailyWater.waterIntakes.findIndex(
//     (item) => item._id === action.payload._id
//   );

//   state.dailyWater.waterIntakes[index] = action.payload;
// };

// const handleDeleteWater = (state, action) => {
//   const index = state.dailyWater.waterIntakes.findIndex(
//     (item) => item._id === action.payload._id
//   );

//   state.dailyWater.waterIntakes.splice(index, 1);
// };

const handleUpdateWater = (state, action) => {
  // Розгортаємо масив waterIntakes на один рівень
  const flatWaterIntakes = state.dailyWater.waterIntakes.flat();

  // Знаходимо індекс об'єкта для оновлення
  const index = flatWaterIntakes.findIndex(
    (item) => item._id === action.payload._id
  );

  flatWaterIntakes[index] = action.payload;

  // Оновлюємо стан з новим масивом
  state.dailyWater.waterIntakes = [flatWaterIntakes];
};

const handleDeleteWater = (state, action) => {
  const flatWaterIntakes = state.dailyWater.waterIntakes.flat();

  const index = flatWaterIntakes.findIndex(
    (item) => item._id === action.payload._id
  );

  flatWaterIntakes.splice(index, 1);
  state.dailyWater.waterIntakes = [flatWaterIntakes];
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
      .addCase(getMonthlyWater.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthlyWater = action.payload; // Ensure the data is being stored correctly
        console.log("Monthly water data stored in Redux:", action.payload); // Log the data
      })
      .addCase(getMonthlyWater.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getDailyWater.pending, handlePending)
      .addCase(getDailyWater.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.dailyWater = action.payload;
      })
      .addCase(getDailyWater.rejected, handleRejected)

      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.dailyWater.waterIntakes.push(action.payload);
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
