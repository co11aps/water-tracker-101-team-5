import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./AuthForm.module.css";
import { logIn, register } from "../../redux/auth/operations";

const AuthForm = ({ isSignup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    ...(isSignup && {
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (isSignup) {
      dispatch(register({ email: values.email, password: values.password }))
        .unwrap()
        .then(() => {
          console.log("Register success");
          navigate("/home");
        })
        .catch((err) => {
          console.log("Register error", err);
        });
    } else {
      dispatch(logIn({ email: values.email, password: values.password }))
        .unwrap()
        .then(() => {
          console.log("Login success");
          navigate("/home");
        })
        .catch((err) => {
          console.log("Login error", err);
        });
    }
    setSubmitting(false);
  };

  return (
    <div className={css.authFormContainer}>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={css.formGroup}>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email" component="div" className={css.error} />
            </div>
            <div className={css.formGroup}>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage name="password" component="div" className={css.error} />
            </div>
            {isSignup && (
              <div className={css.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field type="password" name="confirmPassword" id="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className={css.error} />
              </div>
            )}
            <button type="submit" disabled={isSubmitting}>
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>
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