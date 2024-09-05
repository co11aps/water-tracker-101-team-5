import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/services";

export const getDailyWater = createAsyncThunk(
  "water/oneDayWater",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("user/daily-water");
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getMonthlyWater = createAsyncThunk(
  "user/monthlyWater",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("user/monthly-water");
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addWater = createAsyncThunk(
  "user/addWater",
  async (waterData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("user/add-water", waterData);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  "user/updateWater",
  async ({ id, waterData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `user/update-water/${id}`,
        waterData
      );
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "user/deleteWater",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`user/delete-water/${id}`);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const setDailyNorma = createAsyncThunk(
  "user/setDailyNorma",
  async (dailyNormaValue, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "user/daily-norma",
        dailyNormaValue
      );
      return response.data.data;

    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
