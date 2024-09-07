import axios from "axios";
import { BASE_URL } from "../constants/constants";
// import { store } from "../redux/store";
// import { refreshToken } from "../redux/auth/operations";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response, // Успешный ответ
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       console.log("First attempt");
//       try {
//         const result = await store.dispatch(refreshToken());
//         console.log(
//           "Interceptor worked. New accessToken is",
//           result.payload.accessToken
//         );
//         const newAccessToken = result.payload.accessToken;
//         axiosInstance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${newAccessToken}`;
//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         // Повторяем оригинальный запрос с новым токеном
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
