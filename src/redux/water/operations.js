import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/services";

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

export const getMonthlyWater = createAsyncThunk(
  "water/monthlyWater",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("water/month");
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
      const response = await axiosInstance.delete(`water/delete/${id}`);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
