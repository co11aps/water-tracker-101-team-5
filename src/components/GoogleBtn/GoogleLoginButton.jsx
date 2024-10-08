import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styles from "./GoogleLoginButton.module.css";
import { useDispatch } from "react-redux";
import { oAuthLogin } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/constants";

const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      handleOAuthCode(code);
    }
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/get-oauth-url`);

      if (response.ok) {
        const data = await response.json();

        if (data.data.url) {
          window.location.href = data.data.url;
        } else {
          console.error("OAuth URL not found in the response data.");
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthCode = async (code) => {
    dispatch(oAuthLogin({ code }))
      .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button
        className={styles.googleLoginButton}
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <div className={styles.buttonContentWrapper}>
          <div className={styles.buttonIcon}>
            <FcGoogle className={styles.iconGoogle} />
          </div>
          <div className={styles.buttonContents}>Sign in with Google</div>
        </div>
      </button>
    </>
  );
};

export default GoogleLoginButton;
