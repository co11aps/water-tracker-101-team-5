import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo/Logo.svg";
import css from "../Header/header.module.css";

const Logo = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/home"); // Зареєстрований користувач
    } else {
      navigate("/welcome"); // Незареєстрований користувач
    }
  };

  return (
    <div onClick={handleClick}>
      <a href="./" lang="en" className={css.logo}>
        <img src={logo} alt="logo" />
      </a>
    </div>
  );
};

export default Logo;
