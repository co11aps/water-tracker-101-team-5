import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../../redux/auth/operations";
// import toast from "react-hot-toast";
import css from "./ForgotPasswordForm.module.css";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../redux/notification/slice";

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const forgotPasswordError = useSelector(
    (state) => state.auth.forgotPasswordError
  );
  const isSubmitting = useSelector((state) => state.auth.isSubmitting);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(forgotPassword(values.email))
      .unwrap()
      .then(() => {
        // toast.success("Password reset email sent!");
        dispatch(
          showNotification(
            "Password reset email sent! Check your mailbox and follow the link provided in the email."
          )
        );
        navigate("/signin");
        resetForm();
      })
      .catch((error) => {
        dispatch(
          showNotification(error || "Failed to send password reset email")
        );
        // toast.error(error || "Failed to send password reset email");
      });
  };

  return (
    <div className={css.box}>
      <h1 className={css.title}>Forgot password?</h1>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={css.form}>
              <label htmlFor="email" className={css.label}>
                Enter your email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>
            <button
              type="submit"
              aria-label="Submit"
              disabled={isSubmitting}
              className={css.button}
            >
              {isSubmitting ? "Submitting..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
      {forgotPasswordError && (
        <div className={css.error}>{forgotPasswordError}</div>
      )}
      <div className={css.navigation}>
        <p>
          <a href="/signin">Sign in</a>
        </p>
      </div>
    </div>
  );
}
