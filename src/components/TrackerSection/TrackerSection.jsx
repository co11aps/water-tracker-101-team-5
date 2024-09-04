import css from "./TrackerSection.module.css";
import Calendar from "../Calendar/Calendar";
import TodayWaterList from "../TodayWaterList/TodayWaterList";

export default function TrackerSection() {
  return (
    <div className={css.container}>
      <TodayWaterList />
      <Calendar />
    </div>
  );
}
