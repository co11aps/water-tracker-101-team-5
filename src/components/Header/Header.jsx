import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./header.module.css";
import UserAuth from "../UserAuth/UserAuth";
import Logo from "../Logo/Logo";
import UserLogo from "../UserLogo/UserLogo";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.headerContainer}>
      <header className={css.header}>
        <Logo isAuthenticated={selectIsLoggedIn} />
        {isLoggedIn ? <UserLogo /> : <UserAuth />}
      </header>
    </div>
  );
};

export default Header;
