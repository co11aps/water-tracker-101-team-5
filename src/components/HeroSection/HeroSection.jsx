import css from "./HeroSection.module.css";
import DailyNorma from "../DailyNorma/DailyNorma";
import WaterRatioPanel from "../WaterRatioPanel/WaterRatioPanel";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";

export default function HeroSection() {
  return (
    <div className={css.container}>
      <DailyNorma />
      <WaterRatioPanel />
      <AddWaterBtn />
    </div>
  );
}
