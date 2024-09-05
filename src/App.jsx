import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, lazy, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { refreshToken } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { Navigate } from "react-router-dom";

const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectIsRefreshing);

  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  const openSettingModal = () => setIsSettingModalOpen(true);
  const closeSettingModal = () => setIsSettingModalOpen(false);

  return isRefreshing ? (
    <b>Refreshing...</b>
  ) : (
    <Layout
      openSettingModal={openSettingModal} // Передача функцій як пропсів
      closeSettingModal={closeSettingModal}
      isSettingModalOpen={isSettingModalOpen}
    >
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
      </Routes>
    </Layout>
  );
}

export default App;
