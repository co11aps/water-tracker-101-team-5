import "./App.css";
import ColorSchemeToggle from "./components/ColorSchemeToggler/ColorSchemeToggler";
import Calendar from "./components/Calendar/Calendar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import Header from "./components/Header/Header";

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
              <Header />
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
