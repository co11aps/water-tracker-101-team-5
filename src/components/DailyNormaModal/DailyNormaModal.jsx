import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BaseModal } from "../BaseModal/BaseModal.jsx";
import css from "./DailyNormaModal.module.css";
import { updateDailyNorma } from "../../redux/auth/operations.js";

const DailyNormaModal = ({ onClose, isShow }) => {
  const [gender, setGender] = useState("female");
  const [weight, setWeight] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [dailyNorm, setDailyNorm] = useState(0.0);
  const [waterToDrink, setWaterToDrink] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const m = parseFloat(weight);
    const t = parseFloat(activityTime);

    if (gender && !isNaN(m) && !isNaN(t)) {
      let v = 0;
      if (gender === "female") {
        v = m * 0.03 + t * 0.4;
      } else if (gender === "male") {
        v = m * 0.04 + t * 0.6;
      }
      setDailyNorm(v.toFixed(1));
    } else {
      setDailyNorm(0.0);
    }
  }, [gender, weight, activityTime]);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 250)) {
      setWeight(value);
    }
  };

  const handleActivityTimeChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setActivityTime(value);
    }
  };

  const handleWaterToDrinkChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setWaterToDrink(value);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!gender) {
      alert("Please select your gender.");
      return;
    }
    if (!weight || isNaN(weight) || weight <= 0) {
      alert("Please enter a valid weight.");
      return;
    }
    if (isNaN(activityTime) || activityTime < 0) {
      alert("Please enter a valid activity time.");
      return;
    }
    if (isNaN(waterToDrink) || waterToDrink < 0) {
      alert("Please enter a valid amount of water to drink.");
      return;
    }

    const data = {
      gender,
      weight: parseFloat(weight),
      activityTime: parseFloat(activityTime),
      dailyNorm: parseFloat(dailyNorm),
      waterToDrink: parseFloat(waterToDrink),
      date: new Date().toISOString(),
    };

    try {
      await dispatch(updateDailyNorma(data));
      onClose();
    } catch (error) {
      console.error("Error saving daily norma:", error);
      alert("Failed to save daily norma. Please try again.");
    }
  };

  return (
    <BaseModal onClose={onClose} isShow={isShow} title="My daily norma">
      <div className={css.BoxModal}>
        <div>
          <div className={css.Formula}>
            <p className={css.Paragraph}>
              For woman: <span>V=(M*0.03) + (T*0.4)</span>
            </p>
            <p className={css.Paragraph}>
              For man: <span>V=(M*0.04) + (T*0.6)</span>
            </p>
          </div>
          <div className={css.Comment}>
            <p>
              <span>*</span> V is the volume of the water norm in liters per
              day, M is your body weight in kilograms, T is the time of active
              sports or other high-physical-load activities in hours (set to 0
              if none).
            </p>
          </div>
        </div>
        <div>
          <form className={css.Form} onSubmit={handleSave}>
            <div className={css.FormRadio}>
              <p className={css.TitleModal}>Calculate your rate:</p>
              <label>
                <input
                  className={css.InputRadio}
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                />
                <span>For woman</span>
              </label>
              <label>
                <input
                  className={css.InputRadio}
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                />
                <span>For man</span>
              </label>
            </div>
            <div>
              <p className={css.Paragraph}>Your weight in kilograms:</p>
              <input
                className={css.Input}
                type="number"
                min="0"
                max="250"
                placeholder="0"
                value={weight}
                onChange={handleWeightChange}
              />
            </div>
            <div>
              <p className={css.Paragraph}>
                The time of active participation in sports or other activities
                with high physical load in hours:
              </p>
              <input
                className={css.Input}
                type="number"
                min="0"
                placeholder="0"
                value={activityTime}
                onChange={handleActivityTimeChange}
              />
            </div>
            <div className={css.FormResult}>
              The required amount of water in liters per day:
              <strong>{dailyNorm} L</strong>
            </div>
            <div>
              <p className={css.TitleModal}>
                Write down how much water you will drink:
              </p>
              <input
                className={css.Input}
                type="number"
                placeholder="0"
                value={waterToDrink}
                onChange={handleWaterToDrinkChange}
              />
            </div>
            <button type="submit" className={css.Button} onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      </div>
    </BaseModal>
  );
};

export default DailyNormaModal;
