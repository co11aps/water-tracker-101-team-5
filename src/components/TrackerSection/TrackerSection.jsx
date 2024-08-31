import css from "./TrackerSection.module.css";
import Calendar from "../Calendar/Calendar";

export default function TrackerSection() {
  return (
    <div className={css.container}>
      <>
        <Calendar />
      </>
    </div>
  );
}
