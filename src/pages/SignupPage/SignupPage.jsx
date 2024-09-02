import AuthForm from "../../components/AuthForm/AuthForm";
import css from "../../pages/SigninPage/SigninPage.module.css";

const SignupPage = () => {
  return (
    <div className={css.container}>
      <div className={css.containerBox}>
        <div>
          <h1 className={css.containerTitle}>Sign Up</h1>
          <AuthForm isSignup={false} />
        </div>
        <div className={css.bottleBg}></div>
      </div>
    </div>
  );
};

export default SignupPage;
