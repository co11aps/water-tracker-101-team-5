import { useNavigate } from "react-router-dom";
import Icon from "../Icon/Icon";
import css from "./UserAuth.module.css";

const UserAuth = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <nav className={css.headerNav}>
      <button
        onClick={handleSignInClick}
        className={css.headerButton}
        type="button"
        aria-label="Open modal"
      >
        Sign in
        <Icon id="user" width={28} height={28} className={css.icon} />
      </button>
    </nav>
  );
};

export default UserAuth;
