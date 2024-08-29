import "./App.css";
import ColorSchemeToggle from "./components/ColorSchemeToggler/ColorSchemeToggler";
import Calendar from "./components/Calendar/Calendar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SigninPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/" exact>
          <ColorSchemeToggle />
          <h1>Water Tracker</h1>
          <Calendar />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
