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
  outdatedPassword: yup
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
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SettingModal = ({ onClose, onUpdate, isShow }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const [preview, setPreview] = useState(null);
  const [showOutdatedPassword, setShowOutdatedPassword] = useState(false);
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
      const jsonData = {
        gender: values.gender,
        userName: values.userName,
        email: values.email,
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
      alert("Failed to update user data: " + error.message);
    }
  };

  return (
    <BaseModal onClose={onClose} isShow={isShow} title="Setting">
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalContent}>
          <Formik
            initialValues={{
              avatar: null,
              gender: userData.gender || "woman",
              userName: userData.userName || "",
              email: userData.email || "",
              outdatedPassword: "",
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
                      component="p"
                      className={css.error}
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
                    <button type="button" className={css.uploadButton}>
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
                          component="p"
                          className={css.error}
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
                        component="p"
                        className={css.error}
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
                        component="p"
                        className={css.error}
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
                          type={showOutdatedPassword ? "text" : "password"}
                          name="outdatedPassword"
                          placeholder="Password"
                        />
                        <button
                          className={css.buttonSvg}
                          type="button"
                          onClick={() =>
                            setShowOutdatedPassword(!showOutdatedPassword)
                          }
                        >
                          <Icon
                            id={showOutdatedPassword ? "eye" : "eye-slash"}
                            className="icon-blue"
                            width={16}
                            height={16}
                          />
                        </button>
                      </div>
                      <ErrorMessage
                        name="outdatedPassword"
                        component="p"
                        className={css.error}
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
                        component="p"
                        className={css.error}
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
                        component="p"
                        className={css.error}
                      />
                    </div>
                  </div>
                </div>

                <div className={css.contBtn}>
                  <button className={css.saveBtn} type="submit">
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
