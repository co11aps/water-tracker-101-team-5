import { useState } from "react";
import css from "./AddWaterBtn.module.css";
import Icon from "../Icon/Icon";

export default function AddWaterBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button className={css.btn} type="button" onClick={openModal}>
        <Icon id="plus-inside" width="24" height="24" className="icon-white" />
        Add Water
      </button>
      {/* {isModalOpen && (
        <TodayListModal isShow={isModalOpen} onClose={closeModal} />
      )} */}
    </>
  );
}
