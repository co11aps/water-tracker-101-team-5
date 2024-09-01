import { useState } from 'react';
import css from './UserLogoModal.module.css';
import SettingModal from '../SettingModal/SettingModal'
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';


const UserLogoModal = ({ toggleModal }) => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openSettingModal = () => {
    setIsSettingModalOpen(true);
    toggleModal(); 
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    toggleModal(); 
  };

  return (
    <div className={css.modal}>
      <button onClick={openSettingModal}>Setting</button>
      <button onClick={openLogoutModal}>Logout</button>
      <button onClick={toggleModal}>Close</button>
      
      {isSettingModalOpen && <SettingModal toggleModal={() => setIsSettingModalOpen(false)} />}
      {isLogoutModalOpen && <UserLogoutModal toggleModal={() => setIsLogoutModalOpen(false)} />}
    </div>
  );
};

export default UserLogoModal;