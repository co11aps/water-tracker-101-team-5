import { useState, useCallback, useEffect } from "react";
import Icon from "../Icon/Icon";
import css from "./UserLogoModal.module.css";
import SettingModal from "../SettingModal/SettingModal";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";

const UserLogoModal = ({ toggleModal }) => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openSettingModal = () => {
    setIsLogoutModalOpen(false);
    setIsSettingModalOpen(true);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeAllModals = useCallback(() => {
    setIsSettingModalOpen(false);
    setIsLogoutModalOpen(false);
    toggleModal();
  }, [toggleModal]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.code === "Escape") {
        closeAllModals();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeAllModals]);
  return (
    <>
      {!isSettingModalOpen && !isLogoutModalOpen && (
        <div className={css.modal}>
          <div
            className={css.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={openSettingModal} className={css.button}>
              <Icon
                id="cogwheel"
                width={24}
                height={24}
                className="icon-blue"
              />
              <span className={css.buttonText}>Settings</span>
            </button>
            <button onClick={openLogoutModal} className={css.button}>
              <Icon
                id="arrow-up"
                width={24}
                height={24}
                className="icon-blue"
              />
              <span className={css.buttonText}>Log out</span>
            </button>
          </div>
        </div>
      )}
      {isSettingModalOpen && (
        <SettingModal
          onClose={() => {
            setIsSettingModalOpen(false);
            closeAllModals();
          }}
          isShow={isSettingModalOpen}
        />
      )}
      {isLogoutModalOpen && (
        <UserLogoutModal
          isShow={isLogoutModalOpen}
          onClose={() => {
            setIsLogoutModalOpen(false);
            closeAllModals();
          }}

          // isShow={isLogoutModalOpen}

          toggleModal={closeAllModals}
        />
      )}
    </>
  );
};

export default UserLogoModal;
