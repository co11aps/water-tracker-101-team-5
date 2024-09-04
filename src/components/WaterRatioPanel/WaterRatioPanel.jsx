import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import css from "./WaterRatioPanel.module.css";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";

export default function WaterRatioPanel() {
  const [drankTodayValue, setDrankTodayValue] = useState(100);
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
              <span
                className={`${
                  drankTodayValue < 50 ? css.boldTickText : css.tickText
                }`}
              >
                0%
              </span>
            </div>
            <div className={css.tick}>
              <span
                className={`${
                  drankTodayValue >= 50 && drankTodayValue < 100
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
                  drankTodayValue === 100 ? css.boldTickText : css.tickText
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
