import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import css from "./DailyNorma.module.css";

const DailyNorma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dailyNorma } = useSelector(selectUser);
  const waterNorma = dailyNorma / 1000;
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={css.container}>
      <h2 className={css.header}>My daily norma:</h2>
      <div className={css.editContainer}>
        <p className={css.waterVolumeInfo}> {waterNorma} L</p>
        <button className={css.editButton} type="button" onClick={openModal}>
          Edit
        </button>
        {isModalOpen && (
          <DailyNormaModal isShow={isModalOpen} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default DailyNorma;
