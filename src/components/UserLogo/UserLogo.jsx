import { useState } from 'react';
import css from './UserLogo.module.css';
import UserLogoModal from '../UserLogoModal/UserLogoModal';
import Icon from '../Icon/Icon';

const UserLogo = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const getAvatarContent = () => {
    console.log("Avatar:", user.avatar);
    console.log("Name:", user.name);
    console.log("Email:", user.email);
    if (user.avatar) {
      return <img src={user.avatar} alt={user.name} className={css.avatar} />;
    }
    if (user.name) {
      return <span className={css.avatarPlaceholder}>{user.name[0].toUpperCase()}</span>;
    }
    if (user.email) {
      return <span className={css.avatarPlaceholder}>{user.email[0].toUpperCase()}</span>;
    }
    return <Icon id="user" width="40" height="40" className={css.icon} />;
  };

  return (
    <>
      <button onClick={toggleModal} className={css.userLogoBtn}>
        {getAvatarContent()}
        <span className={css.userName}>{user.name || user.email}</span>
      </button>
      {isModalOpen && <UserLogoModal toggleModal={toggleModal} />}
    </>
  );
};

export default UserLogo;
