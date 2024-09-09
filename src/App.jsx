import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { refreshToken } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NotificationModal from "./components/NotificationModal/NotificationModal";

import { setupInterceptors } from "./services/setupInterceptors";

import { Suspense } from "react";
import Loader from "./components/Loader/Loader";

const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const UpdatePasswordPage = lazy(() =>
  import("./pages/UpdatePasswordPage/UpdatePasswordPage")
);
const ForgotPasswordPage = lazy(() =>
  import("./pages/ForgotPasswordPage/ForgotPasswordPage")
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshToken());
    setupInterceptors();
  }, [dispatch]);

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
            <NotificationModal />
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
              path="/forgot-password"
              element={
                <RestrictedRoute>
                  <ForgotPasswordPage />
                </RestrictedRoute>
              }
            />

            <Route
              path="/reset-password"
              element={
                <RestrictedRoute>
                  <UpdatePasswordPage />
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
