import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";
import css from "./ForgotPasswordPage.module.css";

export default function ForgotPasswordPage() {
  return (
    <div className={css.container}>
      <ForgotPasswordForm />
    </div>
  );
}