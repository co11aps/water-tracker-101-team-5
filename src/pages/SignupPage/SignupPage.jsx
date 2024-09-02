import AuthForm from '../../components/AuthForm/AuthForm';
import css from '../../components/AuthForm/AuthForm.module.css';

const SignupPage = () => {
  return (
    <div className={css.authPageWrapper}>
      <img
        src="/src/images/background/desktop/icon-light-bottle-signin.svg"
        alt="Bottle Icon"
        className={css.bottleIcon}
      />
      <AuthForm isSignup={true} />
    </div>
  );
};

export default SignupPage;