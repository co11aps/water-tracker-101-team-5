import css from "./HomePageContainer.module.css";

export default function HomePageContainer({ children }) {
  return <div className={css.container}>{children}</div>;
}
