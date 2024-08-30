import css from "./DailyNorma.module.css";

export default function DailyNorma() {
  return (
    <div className={css.container}>
      <h2 className={css.header}>My daily norma</h2>
      <div className={css.editContainer}>
        <p className={css.waterVolumeInfo}>1.5 L</p>
        <button className={css.editButton}>Edit</button>
      </div>
    </div>
  );
}
