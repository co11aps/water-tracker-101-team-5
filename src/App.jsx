import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { logOut, refreshToken } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { axiosInstance } from "./services/axiosConfig";

import { Suspense } from "react";
import Loader from "./components/Loader/Loader";

const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const result = dispatch(refreshToken());
          const newAccessToken = result.payload.accessToken;
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          dispatch(logOut);
          navigate("/signin");
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <Layout>
      {isRefreshing ? (
        <>
          <p className="loader-message">
            Due to the fact that we use free versions of the services, the page
            may take some time to be loaded.
            <br />
            Thank you for your patience...
          </p>
          <Loader />
        </>
      ) : (
        <Suspense fallback={<Loader />}>
          <div>
            <Toaster />
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route
              path="/welcome"
              element={
                <RestrictedRoute>
                  <WelcomePage />
                </RestrictedRoute>
              }
            />

            <Route
              path="/signin"
              element={
                <RestrictedRoute>
                  <SigninPage />
                </RestrictedRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <RestrictedRoute>
                  <SignupPage />
                </RestrictedRoute>
              }
            />

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<SigninPage />} />
          </Routes>
        </Suspense>
      )}
    </Layout>
  );
}

export default App;
