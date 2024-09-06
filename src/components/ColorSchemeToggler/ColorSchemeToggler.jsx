import { FaSun, FaMoon } from "react-icons/fa";
import css from "./ColorSchemeToggle.module.css";
import { useColorScheme } from "./useColorScheme";

const ColorSchemeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();

  const handleToggle = () => {
    setIsDark(!isDark); 
  };

  return (
    <button className={css.toggleButton} onClick={handleToggle} aria-label="Toggle dark mode">
      {isDark ? <FaMoon className={css.iconMoon} size="20" /> : <FaSun className={css.iconSun} size="20" />}
    </button>
  );
};

export default ColorSchemeToggle;

//=======Original Toggle===============================
// import Toggle from "react-toggle";
// import css from "./ColorSchemeToggle.module.css";
// import { useColorScheme } from "./useColorScheme";
// import { FaSun, FaMoon } from "react-icons/fa";

// const ColorSchemeToggle = () => {
//   const { isDark, setIsDark } = useColorScheme();
//   return (
//     <div className={ css.toggleContainer }>
//       <Toggle
//         checked={isDark}
//         onChange={(event) => setIsDark(event.target.checked)}
//         // icons={{ checked: "🌙", unchecked: "🔆" }}
//         icons={{ 
//           checked: <FaMoon />,
//           unchecked: <FaSun />
//         }}
//         aria-label="Dark mode"
//       />
//     </div>
//   );
// };

// export default ColorSchemeToggle;
