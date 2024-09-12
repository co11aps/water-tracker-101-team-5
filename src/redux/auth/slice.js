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
  forgotPassword, //додала
  updatePassword, //додала
  oAuthLogin,
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
    forgotPasswordError: null, // додала новий стан для обробки помилок
    isSubmitting: false, //додала поле для відслідковування стану відправки форми
    updatePasswordError: null, // додала новий стан для помилок
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
      .addCase(register.rejected, (state) => {
        state.isRefreshing = false;
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
      .addCase(logIn.rejected, (state) => {
        state.isRefreshing = false;
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
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isSubmitting = true;
        state.forgotPasswordError = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isSubmitting = false;
        state.forgotPasswordError = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isSubmitting = false;
        state.forgotPasswordError = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isSubmitting = true;
        state.updatePasswordError = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isSubmitting = false;
        state.updatePasswordError = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isSubmitting = false;
        state.updatePasswordError = action.payload;
      })
      .addCase(oAuthLogin.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(oAuthLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(oAuthLogin.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
