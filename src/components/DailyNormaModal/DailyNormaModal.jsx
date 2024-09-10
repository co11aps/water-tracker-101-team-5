import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BaseModal } from "../BaseModal/BaseModal.jsx";
import css from "./DailyNormaModal.module.css";
import { updateDailyNorma, getUserInfo } from "../../redux/auth/operations.js";
import { toast } from "react-hot-toast";

const DailyNormaModal = ({ onClose, isShow }) => {
  const [gender, setGender] = useState("female");
  const [weight, setWeight] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [dailyNorm, setDailyNorm] = useState(0.0);
  const [waterToDrink, setWaterToDrink] = useState("2");
  const [isTouched, setIsTouched] = useState(false);
  const [validationError, setValidationError] = useState("");
  const dispatch = useDispatch();
  const toastStyle = {
    style: {
      background: "var(--primary-color-white)",
      border: "1px solid var(--primary-color-black)",
      padding: "16px",
      color: "var(--primary-color-black)",
    },
  };

  useEffect(() => {
    const m = parseFloat(weight);
    const t = parseFloat(activityTime);

    if (!isNaN(m)) {
      let v = 0;
      if (gender === "female") {
        v = m * 0.03 + (isNaN(t) ? 0 : t * 0.4);
      } else if (gender === "male") {
        v = m * 0.04 + (isNaN(t) ? 0 : t * 0.6);
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
      if (Number(value) > 0) {
        setValidationError(""); 
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (isNaN(waterToDrink) || waterToDrink <= 0) {
      setValidationError("Please enter a valid amount");
      return;
    }

    setValidationError("");

    const waterToDrinkInMl = parseFloat(waterToDrink) * 1000;

    const data = {
      dailyNorma: waterToDrinkInMl,
    };

    try {
      await dispatch(updateDailyNorma(data));
      await dispatch(getUserInfo());
      toast.success("Daily norma saved successfully!", toastStyle);
      onClose();
    } catch (error) {
      
      toast.error(`Failed to save daily norma: ${error.message}`, toastStyle);
    }
  };

  return (
    <>
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
                  className={`${css.Input} ${isTouched ? (validationError ? css.InputError : css.InputValid) : ''}`}
                  type="number"
                  placeholder="0"
                  value={waterToDrink}
                  onChange={(e) => {
                    handleWaterToDrinkChange(e);
                    setIsTouched(true); 
                  }}
                  onBlur={() => setIsTouched(true)} 
                />
                {validationError && (
                  <p className={css.ValidationError}>{validationError}</p>
                )}
              </div>
              <button type="submit" className={css.Button}>
                Save
              </button>
            </form>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default DailyNormaModal;


