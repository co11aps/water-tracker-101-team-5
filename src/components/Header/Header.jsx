import css from "./header.module.css";
import Icon from "../Icon/Icon";
import logo from "../../images/logo/Logo.svg";
import UserLogo from "../UserLogo/UserLogo";

const Header = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "", 
  };

  
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
          <UserLogo user={user} />
        </nav>
      </header>
    </div>
  );
};

export default Header;
