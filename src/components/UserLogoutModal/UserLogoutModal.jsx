import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Icon from '../Icon/Icon'; 
import css from './UserLogoutModal.module.css';

const UserLogoutModal = ({ toggleModal }) => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [toggleModal]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      dispatch({ type: 'LOGOUT' });

      toggleModal();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={css.backdrop} onClick={toggleModal}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={css.closeButton} onClick={toggleModal}>
          <Icon id="close" width="24" height="24" className={css.closeIcon} />
        </button>
        <h2>Log out</h2>
        <p>Do you really want to leave?</p>
        <button onClick={toggleModal} className={css.cancelButton}>
          Cancel
        </button>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserLogoutModal;