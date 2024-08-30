import css from "./AddWaterBtn.module.css";
import Icon from "../Icon/Icon";

export default function AddWaterBtn() {
  return (
    <button className={css.btn}>
      <Icon
        id="icon-plus-inside"
        width="24"
        height="24"
        className="icon-white"
      />
      Add Water
    </button>
  );
}
