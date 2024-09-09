import { useState } from "react";
import { useDispatch } from "react-redux";
import { addWater, updateWater } from "../../redux/water/operations";
import css from "./TodayListModal.module.css";
import { BaseModal } from "../BaseModal/BaseModal";
import Icon from "../Icon/Icon";

export default function TodayListModal({ isShow, onClose, item }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(item ? item.amount : 50);
  const [time, setTime] = useState(item ? item.time : getCurrentTime());

  function getCurrentTime() {
    const now = new Date();
    const minutes = Math.round(now.getMinutes() / 5) * 5;
    return `${String(now.getHours()).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
  }

  const handleAmountChange = (value) => {
    setAmount(Math.max(0, value)); //кількість не негативна- додаткову перевірку+
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
      title={item ? "Edit the entered amount of water" : "Add water"}
    >
      <div className={css.modal}>
        {item && (
          <div className={css.previousRecord}>
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
        )}
        <h3>{item ? "Correct entered data:" : "Choose a value:"}</h3>
        <p>Amount of water:</p>

        <div className={css.amountInput}>
          <button
            className={css.amountInputButton}
            onClick={() => handleAmountChange(amount - 50)}
          >
            <Icon
              id="minus"
              width={32}
              height={32}
              aria-hidden="true"
              className={css.iconMinus}
            />
          </button>
          <span>{amount} ml</span>
          <button
            className={css.amountInputButton}
            onClick={() => handleAmountChange(amount + 50)}
          >
            <Icon
              id="plus"
              width={32}
              height={32}
              aria-hidden="true"
              className={css.iconPlus}
            />
          </button>
        </div>
        <div className={css.timeInput}>
          <label className={css.timeLabel}>Recording time:</label>
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
          <label className={css.manualInputLabel}>
            Enter the value of the water used:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(Number(e.target.value))}
            className={css.numberInput}
          />
        </div>
        <div className={css.buttons}>
          <span className={css.savedAmount}>{amount} ml</span>
          <button className={css.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
