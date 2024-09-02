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

    if (user.avatar) {
      return <img src={user.avatar} alt={user.name} className={css.avatar} />;
    }
    if (user.name) {
      return <span className={css.avatarPlaceholder}>{user.name[0].toUpperCase()}</span>;
    }
    if (user.email) {
      return <span className={css.avatarPlaceholder}>{user.email[0].toUpperCase()}</span>;
    }
    return <Icon id="checkmark" width={40} height={40} className="icon-blue" />;
  };

  return (
    <div className={css.userLogoWrapper}>
      <button onClick={toggleModal} className={css.userLogoBtn}>
        <span className={css.userName}>{user.name || user.email}</span>
        {getAvatarContent()}
      </button>
      {isModalOpen && <UserLogoModal toggleModal={toggleModal} />}
      </div>
  );
};

export default UserLogo;
