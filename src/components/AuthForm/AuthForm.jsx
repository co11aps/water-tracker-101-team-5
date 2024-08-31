import { useNavigate } from "react-router-dom";
import css from "./AuthForm.module.css";
import { useDispatch } from "react-redux";
import { logIn, register } from "../../redux/auth/operations";

const AuthForm = ({ isSignup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!isSignup) {
      dispatch(
        logIn({
          email: form.elements.email.value,
          password: form.elements.password.value,
        })
      )
        .unwrap()
        .then(() => {
          console.log("login success");
          navigate("/home");
        })
        .catch((err) => {
          console.log("login error", err);
        });
      form.reset();
    }

    dispatch(
      register({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    )
      .unwrap()
      .then(() => {
        console.log("Register success");
        navigate("/home");
      })
      .catch((err) => {
        console.log("Register error", err);
      });
    form.reset();
  };

  return (
    <div className={css.authFormContainer}>
      <form onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
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
