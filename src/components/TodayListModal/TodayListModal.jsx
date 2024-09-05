import { useState } from "react";
import { useDispatch } from "react-redux";
import { addWater, updateWater } from "../../redux/water/operations";
import css from "./TodayListModal.module.css";
import { BaseModal } from "../BaseModal/BaseModal";

export default function TodayListModal({ isShow, onClose, item }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(item ? item.amount : 50);
  const [time, setTime] = useState(item ? item.time : "07:00");

  const handleSave = () => {
    if (item) {
      dispatch(updateWater({ id: item.id, waterData: { amount, time } }));
    } else {
      dispatch(addWater({ amount, time }));
    }
    onClose();
  };

  return (
    <BaseModal onClose={onClose} isShow={isShow} title="Add water">
      <div className={css.modal}>
        <h3>Choose a value:</h3>
        <p>Amount of water:</p>
        <div className={css.amountInput}>
          <button onClick={() => setAmount(Math.max(50, amount - 50))}>
            -
          </button>
          <span>{amount} ml</span>
          <button onClick={() => setAmount(amount + 50)}>+</button>
        </div>
        <div className={css.timeInput}>
          <label>Recording time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className={css.buttons}>
          <button className={css.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
