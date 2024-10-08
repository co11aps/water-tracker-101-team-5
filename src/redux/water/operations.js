import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosConfig";

const getCurrentYearAndMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  return { year, month };
};

export const getDailyWater = createAsyncThunk(
  "water/oneDayWater",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("water/day");
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Thunk to fetch monthly water data
export const getMonthlyWater = createAsyncThunk(
  "water/monthlyWater",
  async ({ year, month }, thunkAPI) => {
    try {
      const formattedMonth = month.toString().padStart(2, "0"); // Ensure month is two digits
      const response = await axiosInstance.post("water/month", {
        year: year.toString(), // Ensure year is a string
        month: formattedMonth, // Send the formatted month
      });
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addWater = createAsyncThunk(
  "water/addWater",
  async (waterData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("water/add", waterData);

      const { year, month } = getCurrentYearAndMonth();
      await thunkAPI.dispatch(getDailyWater());
      await thunkAPI.dispatch(getMonthlyWater({ year, month }));
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  "water/updateWater",
  async ({ id, waterData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `water/update/${id}`,
        waterData
      );

      const { year, month } = getCurrentYearAndMonth();
      await thunkAPI.dispatch(getDailyWater());
      await thunkAPI.dispatch(getMonthlyWater({ year, month }));
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`water/delete/${id}`);

      const { year, month } = getCurrentYearAndMonth();
      await thunkAPI.dispatch(getDailyWater());
      await thunkAPI.dispatch(getMonthlyWater({ year, month }));
      return { _id: id };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
