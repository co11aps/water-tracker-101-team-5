import css from "./AddWaterBtn.module.css";
import Icon from "../Icon/Icon";

export default function AddWaterBtn({ onClick }) {
  return (
    <button className={css.btn} onClick={onClick}>
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
