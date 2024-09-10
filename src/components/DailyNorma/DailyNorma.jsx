import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { getUserInfo } from "../../redux/auth/operations";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import css from "./DailyNorma.module.css";

const DailyNorma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { dailyNorma } = useSelector(selectUser);
  const waterNorma = dailyNorma ? (dailyNorma / 1000).toFixed(1) : "2.0"; // Default to 2.0 L if norma is not set

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

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
        <p className={css.waterVolumeInfo}>{waterNorma} L</p>
        <button
          className={css.editButton}
          type="button"
          aria-label="Opens modal window for editing daily norma"
          onClick={openModal}
        >
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
