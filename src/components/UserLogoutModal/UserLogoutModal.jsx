import css from './UserLogoutModal.module.css';

const UserLogoutModal = ({ toggleModal }) => (
  <div className={css.modal}>
    <h2>Logout</h2>
    <p>Are you sure you want to logout?</p>
    <button onClick={toggleModal}>Cancel</button>
    <button onClick={toggleModal}>Confirm</button>
  </div>
);

export default UserLogoutModal;