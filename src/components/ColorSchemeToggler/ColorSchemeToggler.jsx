import Toggle from "react-toggle";
import "react-toggle/style.css";
import { useColorScheme } from "./useColorScheme";
import { FaSun, FaMoon } from "react-icons/fa";

const ColorSchemeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();
  return (
    <div className="toggle-container">
      <Toggle
        checked={isDark}
        onChange={(event) => setIsDark(event.target.checked)}
        // icons={{ checked: "🌙", unchecked: "🔆" }}
        icons={{ 
          checked: <FaMoon />,
          unchecked: <FaSun />
        }}
        aria-label="Dark mode"
      />
    </div>
  );
};

export default ColorSchemeToggle;
