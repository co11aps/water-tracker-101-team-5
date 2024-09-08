import {
  useState,
  // , useEffect
} from "react";
import { useDispatch } from "react-redux";
import { addWater, updateWater } from "../../redux/water/operations";
import css from "./TodayListModal.module.css";
import { BaseModal } from "../BaseModal/BaseModal";

export default function TodayListModal({ isShow, onClose, item }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(item ? item.amount : 50);
  const [time, setTime] = useState(item ? item.time : getCurrentTime());

  // Повертає поточний час у форматі HH:MM з кроком 5 хвилин
  function getCurrentTime() {
    const now = new Date();
    const minutes = Math.round(now.getMinutes() / 5) * 5;
    return `${String(now.getHours()).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
  }

  // Оновлення обох полів для кількості води
  const handleAmountChange = (value) => {
    setAmount(Math.max(0, value)); //кількість не негативна
  };

  const handleSave = () => {
    if (item) {
      dispatch(updateWater({ id: item._id, waterData: { amount, time } }));
    } else {
      dispatch(addWater({ amount, time }));
    }
    onClose();
  };

  return (
    <BaseModal
      onClose={onClose}
      isShow={isShow}
      title={item ? "Edit water" : "Add water"}
    >
      <div className={css.modal}>
        <h3>Choose a value:</h3>
        <p>Amount of water:</p>
        <div className={css.amountInput}>
          <button onClick={() => handleAmountChange(amount - 50)}>-</button>
          <span>{amount} ml</span>
          <button onClick={() => handleAmountChange(amount + 50)}>+</button>
        </div>
        <div className={css.timeInput}>
          <label>Recording time:</label>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            {Array.from({ length: 24 * 12 }, (_, i) => {
              const hours = Math.floor(i / 12);
              const minutes = (i % 12) * 5;
              return (
                <option
                  key={i}
                  value={`${String(hours).padStart(2, "0")}:${String(
                    minutes
                  ).padStart(2, "0")}`}
                >
                  {`${String(hours).padStart(2, "0")}:${String(
                    minutes
                  ).padStart(2, "0")}`}
                </option>
              );
            })}
          </select>
        </div>
        <div className={css.manualInput}>
          <label>Enter the value of the water used:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(Number(e.target.value))}
            className={css.numberInput}
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
  // return (
  //   <BaseModal onClose={onClose} isShow={isShow} title="Add water">
  //     <div className={css.modal}>
  //       <h3>Choose a value:</h3>
  //       <p>Amount of water:</p>
  //       <div className={css.amountInput}>
  //         <button onClick={() => setAmount(Math.max(50, amount - 50))}>
  //           -
  //         </button>
  //         <span>{amount} ml</span>
  //         <button onClick={() => setAmount(amount + 50)}>+</button>
  //       </div>
  //       <div className={css.timeInput}>
  //         <label>Recording time:</label>
  //         <input
  //           type="time"
  //           value={time}
  //           onChange={(e) => setTime(e.target.value)}
  //         />
  //       </div>
  //       <div className={css.buttons}>
  //         <button className={css.saveButton} onClick={handleSave}>
  //           Save
  //         </button>
  //       </div>
  //     </div>
  //   </BaseModal>
  // );
}
