import AuthForm from '../../components/AuthForm/AuthForm';

const SigninPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <AuthForm isSignup={false} />
    </div>
  );
};

export default SigninPage;