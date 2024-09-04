import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/services";

export const getDailyWater = createAsyncThunk(
  "water/oneDayWater",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("water/day");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
