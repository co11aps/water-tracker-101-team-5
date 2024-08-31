import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import css from "./WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={css.backgroundContainer}>
      <Header />
      <Main />
    </div>
  );
}
