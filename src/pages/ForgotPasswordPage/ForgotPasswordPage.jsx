import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";
import css from "./ForgotPasswordPage.module.css";

export default function ForgotPasswordPage() {
  return (
    <div className={css.container}>
      <div className={css.containerBox}>
        <div>
          <ForgotPasswordForm />
        </div>
        <div className={css.bottleBg}></div>
      </div>
      
    </div>
  );
}