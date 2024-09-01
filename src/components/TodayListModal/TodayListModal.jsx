import { useState } from "react";
import css from "./TodayListModal.module.css";

export default function TodayListModal({ onClose, onSave }) {
  const [volume, setVolume] = useState(200);
  const [time, setTime] = useState("07:00");

  const handleSave = () => {
    onSave({ volume, time });
    onClose();
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          X
        </button>
        <h3 className={css.title}>Add Water</h3>

        <div className={css.inputGroup}>
          <label>Amount of water:</label>
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className={css.numberInput}
          />
        </div>

        <div className={css.inputGroup}>
          <label>Recording time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={css.timeInput}
          />
        </div>

        <button onClick={handleSave} className={css.saveButton}>
          Save
        </button>
      </div>
    </div>
  );
}
