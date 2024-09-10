import { FaSun, FaMoon } from "react-icons/fa";
import css from "./ColorSchemeToggler.module.css";
import { useColorScheme } from "./useColorScheme";

const ColorSchemeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();

  const handleToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      className={css.toggleButton}
      onClick={handleToggle}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <FaSun className={css.iconMoon} size="20" />
      ) : (
        <FaMoon className={css.iconSun} size="20" />
      )}
    </button>
  );
};

export default ColorSchemeToggle;
