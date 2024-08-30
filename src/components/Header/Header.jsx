import React from "react";
import "./header.module.css";

const Header = () => {
  return (
    <div className="header-container">
      <header className="header">
        <a href="" lang="en" className="logo">
          Tracker of water
          <svg width="102" height="48">
            <use href="/src/images/logo/icon-logo.svg"></use>
          </svg>
        </a>
        <nav className="header-nav">
          <button className="header-button" type="button">
            Sign in
            <svg className="button-svg">
              <use href="/src/images/icons/icons.svg#icon-user"></use>
            </svg>
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
