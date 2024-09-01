import "./App.css";
import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import HomePage from "./pages/HomePage/HomePage";



import { useEffect, lazy } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { refreshUser } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import Loader from "./components/Loader/Loader";
import { Suspense } from "react";

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Layout>
        {isRefreshing ? (
          <b>Refreshing user...</b>
        ) : (
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
             
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
                    <SignupPage/>
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
          </Suspense>
        )}
      </Layout>
    </>

  );
}





export default App;