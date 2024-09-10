import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Header.module.css";
import UserAuth from "../UserAuth/UserAuth";
import Logo from "../Logo/Logo";
import UserLogo from "../UserLogo/UserLogo";
import ColorSchemeToggler from "../ColorSchemeToggler/ColorSchemeToggler";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.headerContainer}>
      <header className={css.header}>
        <Logo isAuthenticated={selectIsLoggedIn} />
        {/* <ColorSchemeToggler /> */}
        {isLoggedIn ? <UserLogo /> : <UserAuth />}
      </header>
    </div>
  );
};

export default Header;
