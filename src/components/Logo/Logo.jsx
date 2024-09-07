import { useNavigate } from "react-router-dom";
import css from "./logo.module.css";

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return <div className={css.logo} onClick={handleClick}></div>;
};

export default Logo;
