import { useState } from 'react';
import css from './UserLogo.module.css';
import UserLogoModal from '../UserLogoModal/UserLogoModal';

const UserLogo = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getAvatarContent = () => {
    if (user.avatar) {
      return <img src={user.avatar} alt={user.name} className={css.avatar} />;
    }
    if (user.name) {
      return <span className={css.avatarPlaceholder}>{user.name[0].toUpperCase()}</span>;
    }
    return <span className={css.avatarPlaceholder}>{user.email[0].toUpperCase()}</span>;
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