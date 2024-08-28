import "./App.css";
import ColorSchemeToggle from "./components/ColorSchemeToggler/ColorSchemeToggler";
import Calendar from "./components/Calendar/Calendar";

function App() {
  return (
    <>
      <ColorSchemeToggle />
      <h1>Water Tracker</h1>
      <Calendar />
    </>
  );
}

export default App;
