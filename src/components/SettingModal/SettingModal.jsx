import css from './SettingModal.module.css';

const SettingModal = ({ toggleModal }) => (
  <div className={css.modal}>
    <h2>Settings</h2>
    <button onClick={toggleModal}>Close</button>
  </div>
);

export default SettingModal;