export const selectDailyWater = (state) => state.water.dailyWater;

export const selectDailyWaterIntakes = (state) =>
  state.water.dailyWater.waterIntakes;

// export const selectDailyWaterPercentage = (state) =>
//   state.water.dailyWater.percentage;

export const selectMonthlyWater = (state) => state.water.monthlyWater;
