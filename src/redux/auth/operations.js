import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosConfig";

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
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
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
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

/*
 * POST @ /auth/refresh
 */
export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/refresh");
      // setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
 * PATCH @ /users/avatar
 * headers: Authorization: Bearer token
 * body: { file }
 */
export const updateAvatar = createAsyncThunk(
  "users/avatar",
  async (file, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      const res = await axiosInstance.patch("/users/avatar", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/*
 * PATCH @ /users/update
 * body: { name, email, gender, oldPassword, newPassword }
 */
export const updateUserInfo = createAsyncThunk(
  "users/userUpdate",
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      const res = await axiosInstance.patch("/users/update", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/*
 * GET @ /users/profile
 * headers: Authorization: Bearer token
 */
export const getUserInfo = createAsyncThunk(
  "user/userInfo",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      const res = await axiosInstance.get("/users/profile");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/*
 * POST @ /users/daily-norma
 * body: {dailyNorma}
 */
export const updateDailyNorma = createAsyncThunk(
  "user/dailyNorma",
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      const res = await axiosInstance.post("/users/daily-norma", credentials);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//===========ДОДАЛА forgotPassword=================
/**
 * POST @ /auth/send-reset-email
 * body: { email }
 */
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/send-reset-email", {
        email,
      });
      return response.data;
    } catch (error) {
      console.error("Error details:", error); // Додаткове логування
      const errorMessage =
        error.response?.data?.message || "Failed to send reset email.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

//===========ДОДАЛА =================
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ token, password }, thunkAPI) => {
    try {
      // Запит на оновлення паролю
      //1 варіант
      // const response = await axiosInstance.post(
      //   `/auth/reset-password`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`, // токен тільки в заголовку
      //     },
      //   },
      //   { password }
      // );

      //2 варіант
      console.log("Token: ", token);
      const response = await axiosInstance.post(`/auth/reset-password`, {
        token, // токен тільки в тілі
        password,
      });
      console.log("Server response:", response.data); // лог для відповіді сервера

      // 3 варіант
      // const response = await axiosInstance.post(
      //   `/auth/reset-password`,
      //   { token, password }, // передаємо токен у тілі
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`, // передаємо токен у заголовку
      //     },
      //   }
      // );

      // 4 варіант
      // const response = await axiosInstance({
      //   method: "post",
      //   url: "/auth/reset-password",
      //   data: { token, password },
      //   headers: {
      //     "Content-Type": "application/json", // Вказуємо тип контенту
      //   },
      // });

      return response.data;
    } catch (error) {
      console.log("Error response:", error.response?.data); // додала лог для помилки
      const errorMessage =
        error.response?.data?.message || "Failed to update password";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
