import AuthForm from '../../components/AuthForm/AuthForm';
import '../../components/AuthForm/AuthForm.css'

const SigninPage = () => {
  return (
    <div>
      <h1 className='auth-page-title'>Sign In</h1>
      <AuthForm isSignup={false} />
    </div>
  );
};

export default SigninPage;