import AuthForm from '../../components/AuthForm/AuthForm';
import '../../components/AuthForm/AuthForm.css'

const SignupPage = () => {
  return (
    <div>
      <h1 className='auth-page-title'>Sign Up</h1>
      <AuthForm isSignup={true} />
    </div>
  );
};

export default SignupPage;