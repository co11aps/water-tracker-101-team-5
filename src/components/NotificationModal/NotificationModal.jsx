import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../../redux/notification/slice";

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

  return (
    <div style={modalStyle}>
      <p>{message}</p>
    </div>
  );
};

const modalStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "10px 20px",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "#fff",
  borderRadius: "5px",
  zIndex: 1000,
};

export default NotificationModal;
