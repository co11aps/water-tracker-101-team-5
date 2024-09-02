import AuthForm from "../../components/AuthForm/AuthForm";
import css from "./SigninPage.module.css";

const SigninPage = () => {
  return (
    <div className={css.container}>
      <div className={css.containerBox}>
        <div>
          <h1 className={css.containerTitle}>Sign In</h1>
          <AuthForm isSignup={false} />
        </div>
        <div className={css.bottleBg}></div>
      </div>
    </div>
  );
};

export default SigninPage;
