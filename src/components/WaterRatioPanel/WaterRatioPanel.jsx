import css from "./WaterRatioPanel.module.css";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDailyWater } from "../../redux/water/selectors";
import { getDailyWater } from "../../redux/water/operations";

export default function WaterRatioPanel() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDailyWater()); // Викликаємо операцію для отримання даних при завантаженні компонента
  }, [dispatch]);

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
