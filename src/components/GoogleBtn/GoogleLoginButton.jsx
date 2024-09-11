import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import styles from './GoogleLoginButton.module.css';

const GoogleLoginButton = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleOAuthCode(code); 
    }
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
    
      const response = await fetch('https://water-tracker-backend-101-team-5.onrender.com/auth/get-oauth-url');

      if (response.ok) {
        const data = await response.json();
        console.log('Successful response:', data);

        if (data.data.url) {
          
          window.location.href = data.data.url;
        } else {
          console.error('OAuth URL not found in the response data.');
          setError('OAuth URL not found.');
        }
      } else {
        console.error('Error:', response.statusText);
        setError(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error sending request:', error);
      setError('An error occurred while sending the request.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthCode = async (code) => {
    try {
      
      const response = await fetch('https://water-tracker-backend-101-team-5.onrender.com/auth/oauth-callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('OAuth callback successful:', data);

        
        if (data.token) {
          localStorage.setItem('token', data.token); 
          window.location.href = '/home';
        } else {
          setError('Token not found in the response');
        }
      } else {
        console.error('Error:', response.statusText);
        setError(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error sending OAuth code:', error);
      setError('An error occurred while sending the OAuth code.');
    }
  };

  return (
    <>
      <button 
        className={styles.buttonAuth} 
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <FcGoogle className={styles.icon} />
        {loading ? 'Signing In...' : 'Sign In with Google'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default GoogleLoginButton;


