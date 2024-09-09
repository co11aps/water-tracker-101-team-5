import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Icon from "../Icon/Icon";
import { selectUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar, updateUserInfo } from "../../redux/auth/operations";
import css from "./SettingModal.module.css";
import { BaseModal } from "../BaseModal/BaseModal";

const MAX_CHAR_VALIDATION = 64;
const MIN_CHAR_VALIDATION = 8;
const MAX_CHAR_NAME_VALIDATION = 32;

const userSchema = yup.object().shape({
  avatar: yup.mixed(),
  gender: yup.string(),
  userName: yup
    .string()
    .max(
      MAX_CHAR_NAME_VALIDATION,
      `Your name must be less than ${MAX_CHAR_NAME_VALIDATION} characters!`
    ),
  email: yup.string().email("You must enter a valid email address!"),
  currentPassword: yup
    .string()
    .min(
      MIN_CHAR_VALIDATION,
      `Your outdated password must be more than ${MIN_CHAR_VALIDATION} characters!`
    )
    .max(
      MAX_CHAR_VALIDATION,
      `Your outdated password must be less than ${MAX_CHAR_VALIDATION} characters!`
    ),
  newPassword: yup
    .string()
    .min(
      MIN_CHAR_VALIDATION,
      `Your new password must be more than ${MIN_CHAR_VALIDATION} characters!`
    )
    .max(
      MAX_CHAR_VALIDATION,
      `Your new password must be less than ${MAX_CHAR_VALIDATION} characters!`
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const SettingModal = ({ onClose, isShow }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const [preview, setPreview] = useState(null);
  const [ShowCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  useEffect(() => {
    setPreview(userData.avatar); // показ аватара при завантаженні
  }, [userData]);

  const handleAvatarChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue("avatar", file);
    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("avatar", file);
    dispatch(updateAvatar(formData))
      .unwrap()
      .then(() => {
        console.log("Avatar update success");
      })
      .catch((err) => {
        console.log("User updating error", err);
      });
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { confirmNewPassword, ...formData } = values;

      const jsonData = {
        gender: formData.gender,
        userName: formData.userName,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      dispatch(updateUserInfo(jsonData))
        .unwrap()
        .then(() => {
          console.log("User update success");
        })
        .catch((err) => {
          console.log("User updating error", err);
        });

      onClose();
      resetForm();
    } catch (error) {
      console.log("Failed to update user data: ", error.message);
    }
  };

  return (
    <BaseModal onClose={onClose} isShow={isShow} title="Setting">
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalContent}>
          <Formik
            initialValues={{
              gender: userData.gender || "woman",
              userName: userData.userName || "",
              email: userData.email || "",
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            validationSchema={userSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className={css.formGroup}>
                  <label className={css.label}>Your photo</label>
                  <div className={css.photoUploadContainer}>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={(e) => handleAvatarChange(e, setFieldValue)}
                    />
                    <ErrorMessage
                      name="avatar"
                      component="div"
                      className={css.errorPassword}
                    />
                    {preview && (
                      <div className={css.avatarPreviewWrapper}>
                        <img
                          src={preview}
                          alt="Avatar Preview"
                          className={css.avatar}
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      aria-label="Upload"
                      className={css.uploadButton}
                    >
                      <Icon
                        id="arrow-up"
                        width={16}
                        height={16}
                        className="icon-blue"
                      />
                      Upload a photo
                    </button>
                  </div>
                </div>
                <div className={css.inputGroup}>
                  <div className={css.input1}>
                    <div className={css.formGroup}>
                      <label className={css.label}>Your gender identity</label>
                      <div className={css.gender}>
                        <label>
                          <Field type="radio" name="gender" value="Woman" />{" "}
                          Woman
                        </label>
                        <label>
                          <Field type="radio" name="gender" value="Man" /> Man
                        </label>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          className={css.errorPassword}
                        />
                      </div>
                    </div>

                    <div className={css.formGroup}>
                      <label className={css.label}>Your name</label>

                      <Field
                        className={css.input}
                        type="text"
                        name="userName"
                        placeholder="Enter your name"
                      />

                      <ErrorMessage
                        name="userName"
                        component="div"
                        className={css.errorPassword}
                      />
                    </div>

                    <div className={css.formGroup}>
                      <label className={css.label}>E-mail</label>

                      <Field
                        className={css.input}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={`${css.errorPassword} ${css.errorMessage}`}
                      />
                    </div>
                  </div>

                  <div className={css.input2}>
                    <div className={css.formGroup}>
                      <label className={css.label}>Password</label>
                      <p>Outdated password:</p>
                      <div className={css.inputWrap}>
                        <Field
                          className={css.input}
                          type={ShowCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          placeholder="Password"
                        />
                        <button
                          className={css.buttonSvg}
                          type="button"
                          aria-label="Show password"
                          onClick={() =>
                            setShowCurrentPassword(!ShowCurrentPassword)
                          }
                        >
                          <Icon
                            id={ShowCurrentPassword ? "eye" : "eye-slash"}
                            className="icon-blue"
                            width={16}
                            height={16}
                          />
                        </button>
                      </div>
                      <ErrorMessage
                        name="currentPassword"
                        component="div"
                        className={css.errorPassword}
                      />
                    </div>

                    <div className={css.formGroup}>
                      <label>New Password:</label>
                      <div className={css.inputWrap}>
                        <Field
                          className={css.input}
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          placeholder="Password"
                        />
                        <button
                          className={css.buttonSvg}
                          type="button"
                          aria-label="Show password"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          <Icon
                            id={showNewPassword ? "eye" : "eye-slash"}
                            className="icon-blue"
                            width={16}
                            height={16}
                          />
                        </button>
                      </div>
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className={css.errorPassword}
                      />
                    </div>

                    <div className={css.formGroup}>
                      <label>Repeat new password:</label>
                      <div className={css.inputWrap}>
                        <Field
                          className={css.input}
                          type={showConfirmNewPassword ? "text" : "password"}
                          name="confirmNewPassword"
                          placeholder="Password"
                        />
                        <button
                          className={css.buttonSvg}
                          type="button"
                          aria-label="Show password"
                          onClick={() =>
                            setShowConfirmNewPassword(!showConfirmNewPassword)
                          }
                        >
                          <Icon
                            id={showConfirmNewPassword ? "eye" : "eye-slash"}
                            className="icon-blue"
                            width={16}
                            height={16}
                          />
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmNewPassword"
                        component="div"
                        className={`${css.errorPassword} ${css.errorMessage}`}
                      />
                    </div>
                  </div>
                </div>

                <div className={css.contBtn}>
                  <button
                    className={css.saveBtn}
                    type="submit"
                    aria-label="Submit"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </BaseModal>
  );
};

export default SettingModal;
