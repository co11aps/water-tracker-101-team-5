import AuthForm from '../../components/AuthForm/AuthForm';
import css from '../../components/AuthForm/AuthForm.module.css'

const SignupPage = () => {
  return (
    <div>
      <h1 className={css.authPageTitle}>Sign Up</h1>
      <AuthForm isSignup={true} />
    </div>
  );
};

export default SignupPage;