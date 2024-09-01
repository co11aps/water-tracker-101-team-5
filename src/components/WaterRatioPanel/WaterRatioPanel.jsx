import { useSelector } from "react-redux";

import css from "./WaterRatioPanel.module.css";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";

export default function WaterRatioPanel() {
  // const { drankToday } = useSelector();
  const drankTodayValue = 15;

  return (
    <>
      <h2 className={css.header}>Today</h2>

      <div className={css.container}>
        <div className={css.progressBarContainer}>
          <div className={css.progressBar}>
            <div
              className={css.progressBarCompleted}
              style={{ width: `${drankTodayValue}%` }}
            >
              <div className={css.marker}>
                <p className={css.percentageValue}>{drankTodayValue}%</p>
              </div>
            </div>
          </div>
          <div className={css.scale}>
            <div className={css.tick}>
              <span className={css.tickText}>0%</span>
            </div>
            <div className={css.tick}>
              <span className={css.boldTickText}>50%</span>
            </div>
            <div className={css.tick}>
              <span className={css.tickText}>100%</span>
            </div>
          </div>
        </div>
        <AddWaterBtn />
      </div>
    </>
  );
}
