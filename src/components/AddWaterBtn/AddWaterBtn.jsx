import { useState } from "react";
import css from "./AddWaterBtn.module.css"; 
import Icon from "../Icon/Icon";
import TodayListModal from "../TodayListModal/TodayListModal";

export default function AddWaterBtn({className, iconId = "", iconClass = "" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className={`${css.btn} ${className}`}
        type="button"
        onClick={openModal}
      >
        <Icon
          id={iconId} 
          width="24"
          height="24"
          className={`${iconClass} ${css.customIconClass}`}
        />
        Add Water
      </button>
      {isModalOpen && (
        <TodayListModal isShow={isModalOpen} onClose={closeModal} />
      )}
    </>
  );
}



