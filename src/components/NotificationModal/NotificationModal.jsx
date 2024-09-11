import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../../redux/notification/slice";
import css from "./NotificationModal.module.css";
import Icon from "../Icon/Icon";
import ReactDOM from "react-dom";

const NotificationModal = () => {
  const dispatch = useDispatch();
  const { message, isVisible } = useSelector((state) => state.notification);

  //   useEffect(() => {
  //     if (isVisible) {
  //       const timer = setTimeout(() => {
  //         dispatch(hideNotification());
  //       }, 5000);

  //       return () => clearTimeout(timer);
  //     }
  //   }, [isVisible, dispatch]);

  const onClose = useCallback(() => {
    dispatch(hideNotification());
  }, [dispatch]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isVisible) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className={css.backDrop} onClick={onClose}>
      <div className={css.messageWindow} onClick={(e) => e.stopPropagation()}>
        <div onClick={onClose} className={css.closeBtn}>
          <Icon id="x-mark" width={24} height={24} className="icon-blue" />
        </div>
        <h2 className={css.header}>Message</h2>
        <p className={css.messageText}>{message}</p>
        <button
          type="button"
          className={css.okBtn}
          aria-label="close"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default NotificationModal;
