import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../../redux/notification/slice";
import css from "./NotificationModal.module.css";
import Icon from "../Icon/Icon";

const NotificationModal = () => {
  const dispatch = useDispatch();
  const { message, isVisible } = useSelector((state) => state.notification);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  const onClose = () => {
    dispatch(hideNotification());
  };

  return (
    <div style={css.backDrop}>
      <div className={css.messageWindow}>
        <button type="button" onClick={onClose} className={css.closeBtn}>
          <Icon id="x-mark" width={18} height={18} className="icon-blue" />
        </button>
        <p className={css.messageText}>{message}</p>
      </div>
    </div>
  );
};

export default NotificationModal;
