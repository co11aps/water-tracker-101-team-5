// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../../redux/notification/slice";
import css from "./NotificationModal.module.css";
import Icon from "../Icon/Icon";

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

  if (!isVisible) return null;

  const onClose = () => {
    dispatch(hideNotification());
  };

  return (
    <div className={css.backDrop}>
      <div className={css.messageWindow}>
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
    </div>
  );
};

export default NotificationModal;
