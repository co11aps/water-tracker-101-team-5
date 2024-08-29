import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ isSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignup) {
        // Call your signup API here
        // Example: await signup({ email, password });
        history.push('/signin');
      } else {
        // Call your signin API here
        // Example: await signin({ email, password });
        history.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <div className="navigation">
        {isSignup ? (
          <p>
            Already have an account? <a href="/signin">Sign in</a>
          </p>
        ) : (
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;