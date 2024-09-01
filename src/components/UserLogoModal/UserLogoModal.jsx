import { useState } from 'react';
import Icon from '../Icon/Icon';
import css from './UserLogoModal.module.css';

const UserLogoModal = ({ toggleModal }) => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openSettingModal = () => {
    setIsSettingModalOpen(true);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  return (
    <div className={css.modal} onClick={toggleModal}>
      <div className={css.modalContent} onClick={e => e.stopPropagation()}>
        {!isSettingModalOpen && !isLogoutModalOpen && (
          <>
            <button onClick={openSettingModal} className={css.button}>
              <Icon id="cogwheel" width={24} height={24} className="icon-blue" />
              <span className={css.buttonText}>Settings</span>
            </button>
            <button onClick={openLogoutModal} className={css.button}>
              <Icon id="arrow-up" width={24} height={24} className="icon-blue" />
              <span className={css.buttonText}>Log out</span>
            </button>
          </>
        )}
        {isLogoutModalOpen && (
          <div className={css.logoutModal}>
            <h2 className={css.title}>Log out</h2>
            <p className={css.title}>Do you really want to leave?</p>
            <div className={css.block}>
            <button onClick={() => setIsLogoutModalOpen(false)} className={css.cancelButton}>
              Cancel
            </button>
            <button onClick={() => { 
              setIsLogoutModalOpen(false); 
              }} className={css.logoutButton}>
              Logout
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogoModal;