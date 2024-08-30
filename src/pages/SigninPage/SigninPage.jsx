import AuthForm from '../../components/AuthForm/AuthForm';
import css from '../../components/AuthForm/AuthForm.module.css'

const SigninPage = () => {
  return (
    <div>
      <h1 className={css.authPageTitle}>Sign In</h1>
      <AuthForm isSignup={false} />
    </div>
  );
};

export default SigninPage;