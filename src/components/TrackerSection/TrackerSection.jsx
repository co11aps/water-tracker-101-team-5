import css from "./TrackerSection.module.css";
import MonthStatsTable from "../MonthStatsTable/MonthStatsTable";
import TodayWaterList from "../TodayWaterList/TodayWaterList";

export default function TrackerSection() {
  return (
    <div className={css.container}>
      <TodayWaterList />
      <MonthStatsTable />
    </div>
  );
}
