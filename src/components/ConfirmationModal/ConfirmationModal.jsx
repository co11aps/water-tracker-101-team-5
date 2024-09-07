import { BaseModal } from "../BaseModal/BaseModal";
import css from "./ConfirmationModal.module.css";

export default function ConfirmationModal({
  isShow,
  onClose,
  onConfirm,
  message,
}) {
  if (!isShow) return null;

  return (
    <BaseModal onClose={onClose} isShow={isShow} title="Delete entry">
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className={css.btnGroup}>
          {/* <div className={css.actions}> */}
          <button className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={css.confirmButton} onClick={onConfirm}>
            Delete
          </button>
          {/* </div> */}
        </div>
      </div>
    </BaseModal>
    // <div className={css.overlay}>
    //   <div className={css.modal}>
    //  </div>
    // </div>
  );
}

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import css from "./UserLogoutModal.module.css";
// import { logOut } from "../../redux/auth/operations";
// import { useNavigate } from "react-router-dom";
// import { BaseModal } from "../BaseModal/BaseModal.jsx";

// const UserLogoutModal = ({ toggleModal, onClose, isShow }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape") {
//         toggleModal();
//       }
//     };

//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [toggleModal]);

//   const handleLogout = async () => {
//     dispatch(logOut())
//       .then(() => {
//         toggleModal();
//       })
//       .then(() => {
//         navigate("/signin");
//       })
//       .then(() => {
//         console.log("LogOut success");
//       })
//       .catch((err) => {
//         console.log("Register error", err);
//       });
//   };

//   return (
//     <BaseModal onClose={onClose} isShow={isShow} title="Log out">
//       <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
//         <p className={css.textModalContent}>Do you really want to leave?</p>
//         <div className={css.btnGroup}>
//           <button onClick={toggleModal} className={css.cancelButton}>
//             Cancel
//           </button>
//           <button onClick={handleLogout} className={css.logoutButton}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </BaseModal>
//   );
// };

// export default UserLogoutModal;
