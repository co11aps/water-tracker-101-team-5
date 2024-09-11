import { axiosInstance } from "./axiosConfig";
import { refreshToken, logOut } from "../redux/auth/operations";
import { store } from "../redux/store";
import { useNavigate } from "react-router-dom";

export const setupInterceptors = () => {
  const navigate = useNavigate;
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (error.response.data.message === "Access token expired") {
          try {
            const result = await store.dispatch(refreshToken());
            if (result.payload !== undefined && result.payload.accessToken) {
              const newAccessToken = result.payload.accessToken;
              axiosInstance.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);
            } else {
              store.dispatch(logOut());
              navigate("/signin");
              return Promise.reject("Refresh token failed, user logged out");
            }
          } catch (refreshError) {
            store.dispatch(logOut());
            navigate("/signin");
            return Promise.reject(refreshError);
          }
        }
        if (error.response.data.message === "Unauthorized") {
          store.dispatch(logOut());
          navigate("/signin");
          return Promise.reject("Login failed: invalid credentials");
        }
      }
      return Promise.reject(error);
    }
  );
};
