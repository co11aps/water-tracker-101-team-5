import { useNavigate } from "react-router-dom";
import css from "./WaterСonsumptionTracker.module.css";

export default function WaterСonsumptionTracker() {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
    };
    
  return (
    <div>
      <div className={css.block}>
        <h1 className={css.mainTitle}>Water consumption tracker</h1>
        <h2 className={css.title}>Record daily water intake and track</h2>
        <div className={css.card}>
          <h3 className={css.cardTitle}>Tracker Benefits</h3>
          <ul className={css.list}>
            <li className={css.item}>
                <svg
                className={css.icon}
                  width="32"
                  height="32"
                  aria-label="calendar icon"
                >
                  <use href="./images/icons/icons.svg#icon-calendar"></use>
                </svg>
              <p className={css.text}>Habit drive</p>
              </li>
              <li className={css.item}>
                <svg
                  className={css.icon}
                  width="32"
                  height="32"
                  aria-label="checkmark icon"
                >
                  <use
                    href="./images/icons/icons.svg#icon-presentation-chart-bar"
                  ></use>
                </svg>
                <p className={css.text}>View statistics</p>
              </li>
              <li className={css.item}>
                <svg
                  className={css.icon}
                  width="32"
                  height="32"
                  aria-label="diagram icon"
                >
                  <use href="./images/icons/icons.svg#icon-tools"></use>
                </svg>
                <p className={css.text}>Personal rate setting</p>
              </li>
            </ul>
          </div>
              <button className={css.button} type="button" onClick={handleClick}>Try tracker</button>
        </div>
    </div>
  );
};