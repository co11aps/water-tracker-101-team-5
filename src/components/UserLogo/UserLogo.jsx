import { useState, useRef, useEffect } from "react";
import css from "./UserLogo.module.css";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import Icon from "../Icon/Icon";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

const UserLogo = () => {
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsModalOpen]);

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
    <div ref={modalRef} className={css.userLogoWrapper}>
      <button onClick={toggleModal} className={css.userLogoBtn}>
        <span className={css.userName}>{user.userName || user.email}</span>
        {getAvatarContent()}
        <Icon
          id="checkmark"
          width={16}
          height={16}
          className={`${isModalOpen ? css.iconRotate : ""} icon-blue`}
        />
      </button>
      {isModalOpen && <UserLogoModal toggleModal={toggleModal} />}
    </div>
  );
};

export default UserLogo;
