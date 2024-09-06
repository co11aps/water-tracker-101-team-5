// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import css from "./UserLogoutModal.module.css";
import { logOut } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { BaseModal } from "../BaseModal/BaseModal.jsx";

const UserLogoutModal = ({ toggleModal, onClose, isShow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logOut())
      .then(() => {
        toggleModal();
      })
      .then(() => {
        navigate("/signin");
      })
      .then(() => {
        console.log("LogOut success");
      })
      .catch((err) => {
        console.log("Register error", err);
      });
  };

  return (
    <BaseModal onClose={onClose} isShow={isShow} title="Log out">
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <p className={css.textModalContent}>Do you really want to leave?</p>
        <div className={css.btnGroup}>
          <button onClick={toggleModal} className={css.cancelButton}>
            Cancel
          </button>
          <button onClick={handleLogout} className={css.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default UserLogoutModal;
