import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePassword } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import Icon from "../Icon/Icon";
import css from './UpdatePasswordForm.module.css';

export default function UpdatePasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { token } = useParams(); // Отримую токен з URL
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const { password } = values;
    dispatch(updatePassword({ password, token }))
      .unwrap()
      .then(() => {
        toast.success('Password updated successfully!');
        navigate('/signin');
        resetForm();
      })
      .catch(error => {
        toast.error(error || 'Failed to update password');
      });
  };

  return (
    <div className={css.box}>
      <h1 className={css.title}>Update Password</h1>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.form}>
            <label htmlFor="password" className={css.label} >New Password</label>
            <div className={css.passwordWrapper}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className={css.input}
              />
              <span
                className={css.passwordToggleIcon}
                onClick={togglePasswordVisibility}
              >
                <Icon
                  id={showPassword ? "eye" : "eye-slash"}
                  width={24}
                  height={24}
                  className={css.icon}
                />
              </span>
            </div>
            <ErrorMessage name="password" component="div" className={css.error} />
          </div>
          <div className={css.form}>
            <label htmlFor="confirmPassword" className={css.label} >Confirm Password</label>
            <div className={css.passwordWrapper}>
              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                className={css.input}
              />
              <span
                className={css.passwordToggleIcon}
                onClick={toggleConfirmPasswordVisibility}
              >
                <Icon
                  id={showConfirmPassword ? "eye" : "eye-slash"}
                  width={24}
                  height={24}
                  className={css.icon}
                />
              </span>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={css.error}
            />
          </div>
          <button type="submit" className={css.button}>
            Update
          </button>
        </Form>
      </Formik>
    </div>
  );
}
