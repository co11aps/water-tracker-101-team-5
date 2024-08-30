import "./App.css";
import ColorSchemeToggle from "./components/ColorSchemeToggler/ColorSchemeToggler";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <>
              <ColorSchemeToggle />
              <h1>Water Tracker</h1>
              <div>
                <Link to="/signup">Sign Up</Link>
              </div>
              <HomePage />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
