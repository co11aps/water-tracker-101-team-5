import { useNavigate } from "react-router-dom";
import logo from "../../images/logo/Logo.svg";
import css from "../Header/header.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Logo = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(selectIsLoggedIn);

  const handleClick = () => {
    if (isLoggedIn) {
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
