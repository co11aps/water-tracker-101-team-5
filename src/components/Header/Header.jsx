import React from "react";
import css from "./header.module.css";
import Icon from "../Icon/Icon";
import logo from "../../images/logo/Logo.svg";

const Header = () => {
  return (
    <div className={css.headerContainer}>
      <header className={css.header}>
        <a href="./" lang="en" className={css.logo}>
          <img src={logo} alt="logo" />
        </a>
        <nav className={css.headerNav}>
          <button className={css.headerButton} type="button">
            Sign in
            <Icon id="user" className={css.buttonSvg} />
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
