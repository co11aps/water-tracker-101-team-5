import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/services";

// Utility to add JWT
const setAuthHeader = (accessToken) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = "";
};

/*
 * POST @ /auth/register
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/register", credentials);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(res.data.accessToken);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /auth/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      // After successful login, add the token to the HTTP header
      setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /auth/logout
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosInstance.post("/auth/logout");
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * POST @ /auth/refresh
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/refresh");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition(_, thunkAPI) {
      const state = thunkAPI.getState();
      return state.auth.accessToken !== null;
    },
  }
);

/*
 * PATCH @ /auth/avatar
 * headers: Authorization: Bearer token
 * body: { file }
 */
export const updateAvatar = createAsyncThunk(
  "auth/avatar",
  async (file, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      // const formData = new FormData();
      // formData.append("avatar", file); // "avatar" — matches with "upload.single('avatar')" on server side
      const res = await axiosInstance.patch("/auth/avatar", file);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * PATCH @ /auth/user
 * body: { name, email, gender, oldPassword, newPassword }
 */
export const updateUserInfo = createAsyncThunk(
  "auth/userUpdate",
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      const res = await axiosInstance.patch("/auth/user", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      alert(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * GET @ /auth/user
 * headers: Authorization: Bearer token
 */
export const getUserInfo = createAsyncThunk(
  "auth/userInfo",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      const res = await axiosInstance.get("/auth/user");
      return res.data;
    } catch (error) {
      alert(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /user/daily-norma
 * body: {dailyNorma}
 */
export const updateDailyNorma = createAsyncThunk(
  "user/dailyNorma",
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      const res = await axiosInstance.post("/user/daily-norma", credentials);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
