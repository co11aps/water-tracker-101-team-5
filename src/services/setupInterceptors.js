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
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
        console.log("Interceptor stage 0");
        if (error.response.data.message === "Access token expired") {
          try {
            const result = await store.dispatch(refreshToken());
            if (result.payload !== undefined && result.payload.accessToken) {
              console.log("Interceptor stage 1");
              const newAccessToken = result.payload.accessToken;
              axiosInstance.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);
            } else {
              console.log("Interceptor stage 2");
              store.dispatch(logOut());
              navigate("/signin");
              return Promise.reject("Refresh token failed, user logged out");
            }
          } catch (refreshError) {
            console.log("Interceptor stage 3");
            store.dispatch(logOut());
            navigate("/signin");
            return Promise.reject(refreshError);
          }
        } else if (error.response.data.message === "Unauthorized") {
          console.log("Interceptor stage 4");
          console.log("Stage 4. Error status:", error.response.status);
          console.log("Stage 4. Error data:", error.response.data);
          store.dispatch(logOut());
          navigate("/signin");
          return await Promise.reject({
            data: { status: "error.response.status" },
          });
        } else {
          console.log("Unknown 401 error");
          store.dispatch(logOut());
          navigate("/signin");
          return Promise.reject("Unknown authentication error");
        }
      }
      console.log("Interceptor stage 5");
      return Promise.reject(error);
    }
  );
};
