import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import css from "./ForgotPasswordForm.module.css";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const forgotPasswordError = useSelector(state => state.auth.forgotPasswordError); 
  const isSubmitting = useSelector(state => state.auth.isSubmitting);
  const navigate = useNavigate(); 
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

    const handleSubmit = (values, { resetForm }) => {
    dispatch(forgotPassword(values.email))
      .unwrap()
      .then(() => {
        toast.success("Password reset email sent!");
          navigate("/signin");
          resetForm();
      })
      .catch((error) => {
        toast.error(error || "Failed to send password reset email");
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
        <Form>
          <div className={css.form}>
            <label htmlFor="email" className={css.text}>Enter your email</label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              className={css.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={css.error}
            />
          </div>
                  <button type="submit" disabled={isSubmitting} className={css.button}>
                      {isSubmitting ? "Submitting..." : "Send"}
                  </button>
        </Form>
      </Formik>
      {forgotPasswordError && <div className={css.error}>{forgotPasswordError}</div>}
      <div onClick={() => navigate("/signin")}>Sign in</div>
    </div>
  );
}