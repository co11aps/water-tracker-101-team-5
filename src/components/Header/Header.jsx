import React from "react";
import css from "./header.module.css";
import Icon from "../Icon/Icon";
import logo from "../../images/logo/icon-logo.svg";

const Header = () => {
  return (
    <div className={css.headerContainer}>
      <header className={css.header}>
        <a href="" lang="en" className="logo">
          Tracker of water
          <img src={logo} alt="logo" />
        </a>
        <nav className="header-nav">
          <button className="header-button" type="button">
            Sign in
            {/* <Icon id={}/> */}
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
