import AuthForm from '../../components/AuthForm/AuthForm';

const SignupPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <AuthForm isSignup={true} />
    </div>
  );
};

export default SignupPage;