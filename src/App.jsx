import "./App.css";
import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/"
          element={
            <>
              <ColorSchemeToggle />
              <h1>Water Tracker</h1>
              <div>
                <Link to="/signup">Sign Up</Link>
              </div>
              <Calendar />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
