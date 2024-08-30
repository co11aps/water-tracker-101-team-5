import "./App.css";
import ColorSchemeToggle from "./components/ColorSchemeToggler/ColorSchemeToggler";
import Calendar from "./components/Calendar/Calendar";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <ColorSchemeToggle />
      <h1>Water Tracker</h1>
      <Calendar />
    </>
  );
}

export default App;
