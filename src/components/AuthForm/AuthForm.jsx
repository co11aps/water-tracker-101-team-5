import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './AuthForm.module.css';

const AuthForm = ({ isSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isSignup ? '/auth/register' : '/auth/login';
    const url = `https://water-tracker-backend-101-team-5.onrender.com${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred. Please try again.');
      }

      if (isSignup) {
        navigate('/signin');
      } else {
        const data = await response.json();
        localStorage.setItem('token', data.token); 
        navigate('/dashboard'); 
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={css.authFormContainer}>
      <form onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className={css.error}>{error}</div>}
        <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <div className={css.navigation}>
        {isSignup ? (
          <p>
            Already have an account? <a href="/signin">Sign in</a>
          </p>
        ) : (
          <p>
            Don&apos;t have an account? <a href="/signup">Sign up</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;