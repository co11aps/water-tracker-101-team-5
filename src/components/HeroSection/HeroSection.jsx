import css from "./HeroSection.module.css";
import DailyNorma from "../DailyNorma/DailyNorma";
import WaterRatioPanel from "../WaterRatioPanel/WaterRatioPanel";

export default function HeroSection() {
  return (
    <div className={css.container}>
      <DailyNorma />
      <WaterRatioPanel />
    </div>
  );
}
