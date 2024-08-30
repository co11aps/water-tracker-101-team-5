import css from "./WhyDrinkWater.module.css";

export default function WhyDrinkWater() {
  return (
    <div className={css.block}>
      <div className={css.card}> 
        <h3 className={css.title}>Why drink water</h3>
        <ul className={css.list}>
          <li className={css.item}>
                <svg
              className={css.svg}
                  width="8"
                  height="8"
                  aria-label="ellipse icon"
                >
                  <use href="./images/icons/icons.svg#icon-ellipse"></use>
                </svg>
            <p className={css.text}>
                  Supply of nutrients to all organs
                </p>
              </li>
              <li className={css.item}>
                <svg
                  className={css.svg}
                  width="8"
                  height="8"
                  aria-label="ellipse icon"
                >
                  <use href="./images/icons/icons.svg#icon-ellipse"></use>
                </svg>
                <p className={css.text}>
                  Providing oxygen to the lungs
                </p>
              </li>
              <li className={css.item}>
                <svg
                 className={css.svg}
                  width="8"
                  height="8"
                  aria-label="ellipse icon"
                >
                  <use href="./images/icons/icons.svg#icon-ellipse"></use>
                </svg>
                <p className={css.text}>
                  Maintaining the work of the heart
                </p>
              </li>
              <li className={css.item}>
                <svg
                  className={css.svg}
                  width="8"
                  height="8"
                  aria-label="ellipse icon"
                >
                  <use href="./images/icons/icons.svg#icon-ellipse"></use>
                </svg>
                <p className={css.text}>
                  Release of processed substances
                </p>
              </li>
              <li className={css.item}>
                <svg
                  className={css.svg}
                  width="8"
                  height="8"
                  aria-label="ellipse icon"
                >
                  <use href="./images/icons/icons.svg#icon-ellipse"></use>
                </svg>
                <p className={css.text}>
                  Ensuring the stability of the internal environment
                </p>
              </li>
              <li className={css.item}>
                <svg
                  className={css.svg}
                  width="8"
                  height="8"
                  aria-label="ellipse icon"
                >
                  <use href="./images/icons/icons.svg#icon-ellipse"></use>
                </svg>
                <p className={css.text}>
                  Maintaining within the normal temperature
                </p>
              </li>
              <li className={css.item}>
                <svg
                  className={css.svg}
                  width="8"
                  height="8"
                  aria-label="ellipse icon"
                >
                  <use href="./images/icons/icons.svg#icon-ellipse"></use>
                </svg>
                <p className={css.text}>
                  Maintaining an immune system capable of resisting disease
                </p>
              </li>
            </ul>
          </div>
        </div>
  );
};