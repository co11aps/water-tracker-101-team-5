import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./header.module.css";
import UserAuth from "../UserAuth/UserAuth";
import Logo from "../Logo/Logo";
import UserLogo from "../UserLogo/UserLogo";

const Header = ({
  openSettingModal,
  closeSettingModal,
  isSettingModalOpen,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.headerContainer}>
      <header className={css.header}>
        <Logo isAuthenticated={selectIsLoggedIn} />
        {isLoggedIn ? (
          <UserLogo
            openSettingModal={openSettingModal}
            closeSettingModal={closeSettingModal}
            isSettingModalOpen={isSettingModalOpen}
          />
        ) : (
          <UserAuth />
        )}
      </header>
    </div>
  );
};

export default Header;
