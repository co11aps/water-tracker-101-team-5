import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../Icon/Icon";
import css from "../Header/header.module.css";

const UserAuth = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <>
      <nav className={css.headerNav}>
        <button
          onClick={handleSignInClick}
          className={css.headerButton}
          type="button"
        >
          Sign in
          <Icon id="user" className={css.buttonSvg} />
        </button>
      </nav>
    </>
  );
};

export default UserAuth;
