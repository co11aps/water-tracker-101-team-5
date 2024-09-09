import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWater } from "../../redux/water/operations";
import { selectDailyWater } from "../../redux/water/selectors";
import css from "./TodayWaterList.module.css";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import TodayListModal from "../TodayListModal/TodayListModal";
import Icon from "../Icon/Icon";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const { waterIntakes } = useSelector(selectDailyWater);

  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const parseTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return new Date().setHours(hours, minutes, 0, 0);
  };

  const sortedWaterIntakes = [...waterIntakes].sort(
    (a, b) => parseTime(a.time) - parseTime(b.time)
  );

  const handleDelete = (id) => {
    setDeleteItem(id);
  };

  const confirmDelete = () => {
    dispatch(deleteWater(deleteItem));
    setDeleteItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const openAddModal = () => {
    setEditItem(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditItem(null);
    setDeleteItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Today</h2>
      <div className={css.waterList}>
        {sortedWaterIntakes.length === 0 ? (
          <p className={css.blank}>No notes yet!</p>
        ) : (
          <ul>
            {sortedWaterIntakes.map((item) => (
              <li key={item._id} className={css.listItem}>
                <div className={css.info}>
                  <Icon
                    id="glass"
                    width={26}
                    height={26}
                    aria-hidden="true"
                    className={css.iconGlass}
                  />
                  <span className={css.todayVolume}>{item.amount} ml</span>
                  <span className={css.todayTime}>{item.time}</span>
                </div>
                <div className={css.tools}>
                  <button
                    className={css.editButton}
                    onClick={() => handleEdit(item)}
                  >
                    <Icon
                      id="pensil"
                      width={16}
                      height={16}
                      aria-hidden="false"
                      className={css.iconEditButton}
                    />
                  </button>
                  <button
                    className={css.deleteButton}
                    onClick={() => handleDelete(item._id)}
                  >
                    <Icon
                      id="trash"
                      width={16}
                      height={16}
                      aria-hidden="false"
                      className={css.iconDeliteButton}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <AddWaterBtn
        onClick={openAddModal}
        className={css.addWaterButton}
        iconId="plus"
        iconClass={css.customIconClass}
      />
      {editItem && (
        <TodayListModal
          isShow={!!editItem}
          onClose={closeModal}
          item={editItem} // Передаємо запис для редагування
        />
      )}
      {deleteItem && (
        <ConfirmationModal
          isShow={!!deleteItem}
          onClose={closeModal}
          onConfirm={confirmDelete} // Підтвердження видалення
        />
      )}
    </div>
  );
}
