import { useNavigate } from "react-router-dom";
import css from "./WaterСonsumptionTracker.module.css";
import Icon from "../Icon/Icon";

export default function WaterСonsumptionTracker() {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
    };
    
  return (
    <div className={css.container}>
      <div className={css.block}>
        <div className={css.box}>
          <h1 className={css.heading}>Water consumption tracker</h1>
        <h2 className={css.title}>Record daily water intake and track</h2>
        </div> 
        <div className={css.card}>
          <h3 className={css.cardtitle}>Tracker Benefits</h3>
          <ul className={css.list}>
            <li className={css.item}>
              <Icon
                id="calendar"
                width={32}
                height={32}
                className={css.icon}
              />  
              <p className={css.text}>Habit drive</p>
              </li>
            <li className={css.item}>
              <Icon
                id="presentation-chart-bar"
                width={32}
                height={32}
                className={css.icon}
              />
                <p className={css.text}>View statistics</p>
              </li>
            <li className={css.item}>
              <Icon
                id="tools"
                width={32}
                height={32}
                className={css.icon}
              />
                <p className={css.text}>Personal rate setting</p>
              </li>
            </ul>
          </div>
              <button className={css.button} type="button" onClick={handleClick}>Try tracker</button>
        </div>
    </div>
  );
};
