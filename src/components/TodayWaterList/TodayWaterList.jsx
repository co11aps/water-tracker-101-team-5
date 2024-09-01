import { useState } from "react";
import css from "./TodayWaterList.module.css";
import Icon from "../Icon/Icon";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import TodayListModal from "../TodayListModal/TodayListModal";

export default function TodayWaterList() {
  const [waterList, setWaterList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddWater = (entry) => {
    setWaterList([...waterList, { ...entry, id: Date.now() }]);
  };

  const handleDelete = (id) => {
    setWaterList(waterList.filter((item) => item.id !== id));
  };

  const handleEdit = (id, newEntry) => {
    setWaterList(
      waterList.map((item) =>
        item.id === id ? { ...item, ...newEntry } : item
      )
    );
  };

  return (
    <div>
      <h2>Today</h2>
      <ul className={css.waterList}>
        {waterList.map((entry) => (
          <li key={entry.id} className={css.waterListItem}>
            <span>{entry.volume} ml</span>
            <span>{entry.time}</span>
            <button
              className={css.editButton}
              onClick={() =>
                handleEdit(entry.id, { volume: 300, time: "08:00" })
              }
            >
              <Icon id="icon-edit" width="16" height="16" />
            </button>
            <button
              className={css.deleteButton}
              onClick={() => handleDelete(entry.id)}
            >
              <Icon id="icon-delete" width="16" height="16" />
            </button>
          </li>
        ))}
      </ul>
      <AddWaterBtn onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <TodayListModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddWater}
        />
      )}
    </div>
  );
}
