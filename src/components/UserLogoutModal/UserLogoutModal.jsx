import { useEffect } from "react";
import { useDispatch } from "react-redux";
import css from "./UserLogoutModal.module.css";
import { logOut } from "../../redux/auth/operations";

const UserLogoutModal = ({ toggleModal }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        toggleModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [toggleModal]);

  const handleLogout = async () => {
    dispatch(logOut())
      .then(() => {
        console.log("LogOut success");
      })
      .then(() => {
        toggleModal();
      })
      .catch((err) => {
        console.log("Register error", err);
      });
  };

  return (
    <div className={css.backdrop} onClick={toggleModal}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={toggleModal}></button>
        <h2 className={css.title}>Log out</h2>
        <p className={css.text}>Do you really want to leave?</p>
        <div className={css.buttonGroup}>
        <button onClick={toggleModal} className={css.cancelButton}>
          Cancel
        </button>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogoutModal;
