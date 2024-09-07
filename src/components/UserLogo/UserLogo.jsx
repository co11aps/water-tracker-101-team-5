import { useState } from "react";
import css from "./UserLogo.module.css";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import Icon from "../Icon/Icon";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

const UserLogo = () => {
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const getAvatarContent = () => {
    if (user.photo) {
      return (
        <img src={user.photo} alt={user.userName} className={css.avatar} />
      );
    }
    if (user.userName) {
      return (
        <span className={css.avatarPlaceholder}>
          {user.userName[0].toUpperCase()}
        </span>
      );
    }
    if (user.email) {
      return (
        <span className={css.avatarPlaceholder}>
          {user.email[0].toUpperCase()}
        </span>
      );
    }
  };

  return (
    <div className={css.userLogoWrapper}>
      <button onClick={toggleModal} className={css.userLogoBtn}>
        <span className={css.userName}>{user.userName || user.email}</span>
        {getAvatarContent()}
        <Icon id="checkmark" width={16} height={16} className="icon-blue" />
      </button>
      {isModalOpen && <UserLogoModal toggleModal={toggleModal} />}
    </div>
  );
};

export default UserLogo;
