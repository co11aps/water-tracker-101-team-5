import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/services";

export const getDailyWater = createAsyncThunk(
  "user/dailyWater",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("user/daily-water");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
