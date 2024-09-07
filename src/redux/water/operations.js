import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosConfig";

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
        data: {
          year: year.toString(), // Ensure year is a string
          month: formattedMonth, // Send the formatted month
        },
      });
      console.log("Request body:", {
        year: year.toString(),
        month: formattedMonth,
      });
      console.log("Backend response:", response.data);
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
      // const response = await axiosInstance.delete(`water/delete/${id}`);
      return { _id: id };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
