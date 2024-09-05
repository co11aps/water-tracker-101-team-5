import { createSlice } from "@reduxjs/toolkit";
import {
  logIn,
  logOut,
  refreshToken,
  register,
  updateAvatar,
  updateUserInfo,
  getUserInfo,
  updateDailyNorma,
} from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      userName: null,
      email: null,
      gender: null,
      dailyNorma: null,
      photo: null,
    },
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    isAuthHeaderSet: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isAuthHeaderSet = true;
      })
      .addCase(logIn.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isAuthHeaderSet = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
          gender: null,
          dailyNorma: null,
          photo: null,
        };
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isRefreshing = true;
        state.isAuthHeaderSet = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isAuthHeaderSet = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user.photo = action.payload;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateDailyNorma.fulfilled, (state, action) => {
        state.user.dailyNorma = action.payload.dailyNorma;
      });
  },
});

export const authReducer = authSlice.reducer;
