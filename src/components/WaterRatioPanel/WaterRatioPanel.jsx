import css from "./WaterRatioPanel.module.css";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";

import { useSelector } from "react-redux";
import { selectDailyWater } from "../../redux/water/selectors";

export default function WaterRatioPanel() {
  const { percentage } = useSelector(selectDailyWater);

  return (
    <>
      <h2 className={css.header}>Today</h2>

      <div className={css.container}>
        <div className={css.progressBarContainer}>
          <div className={css.progressBar}>
            <div
              className={css.progressBarCompleted}
              style={{ width: `${percentage}%` }}
            >
              <div className={css.marker}>
                <p className={css.percentageValue}>{percentage}%</p>
              </div>
            </div>
          </div>
          <div className={css.scale}>
            <div className={css.tick}>
              <span
                className={`${
                  percentage < 50 ? css.boldTickText : css.tickText
                }`}
              >
                0%
              </span>
            </div>
            <div className={css.tick}>
              <span
                className={`${
                  percentage >= 50 && percentage < 100
                    ? css.boldTickText
                    : css.tickText
                }`}
              >
                50%
              </span>
            </div>
            <div className={css.tick}>
              <span
                className={`${
                  percentage === 100 ? css.boldTickText : css.tickText
                }`}
              >
                100%
              </span>
            </div>
          </div>
        </div>
        <AddWaterBtn />
      </div>
    </>
  );
}
