import { useState, useEffect } from "react";
import css from "./ErrorModal.module.css";

const ErrorModal = ({ errorMessage, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  console.log("ErrorModal received:", errorMessage);
  // Показ модального окна при наличии ошибки
  useEffect(() => {
    if (errorMessage) {
      setIsVisible(true);
      console.log("ErrorModal received:", errorMessage);
    }
  }, [errorMessage]);

  const handleClose = () => {
    setIsVisible(false);
    onClose(); // Можно использовать для сброса ошибки
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={css.modalBackdrop}>
      <div className={css.modalContent}>
        <h2>Error</h2>
        <p>{errorMessage}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;
