import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import Icon from "../Icon/Icon";

import css from "./BaseModal.module.css";

export const BaseModal = ({ isShow, children, title, onClose }) => {
  const modalRoot = document.querySelector("#modal-root");

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.code === "Escape") {
        handleClose();
      }
    };

    if (isShow) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isShow, handleClose]);

  if (!isShow) {
    return null;
  }

  const baseModalContent = (
    <div className={css.modalBox} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeader}>
          <h2 className={css.modalBoxTitle}>{title}</h2>
          <div className={css.closeBtn} onClick={onClose}>
            <Icon id="x-mark" width={24} height={24} className="icon-blue" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );

  return createPortal(baseModalContent, modalRoot);
};

BaseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isShow: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
