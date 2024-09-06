import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  name: yup
    .string()
    .max(
      MAX_CHAR_NAME_VALIDATION,
      `Your name must be less than ${MAX_CHAR_NAME_VALIDATION} characters!`
    ),
  email: yup.string().email("You must enter valid email address!"),
  // outdatedPassword: yup
  //   .string()
  //   .min(
  //     MIN_CHAR_VALIDATION,
  //     `Your outdated password must be more than ${MIN_CHAR_VALIDATION} characters!`
  //   )
  //   .max(
  //     MAX_CHAR_VALIDATION,
  //     `Your outdated password must be less than ${MAX_CHAR_VALIDATION} characters!`
  //   ),
  // newPassword: yup
  //   .string()
  //   .min(
  //     MIN_CHAR_VALIDATION,
  //     `Your new password must be more than ${MIN_CHAR_VALIDATION} characters!`
  //   )
  //   .max(
  //     MAX_CHAR_VALIDATION,
  //     `Your new password must be less than ${MAX_CHAR_VALIDATION} characters!`
  //   ),
  // repeatNewPassword: yup
  //   .string()
  //   .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const SettingModal = ({ onClose, onUpdate, isShow }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const [preview, setPreview] = useState(null);
  const [showOutdatedPassword, setShowOutdatedPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      ...userData,
      gender: userData.gender || "woman",
    },
  });

  useEffect(() => {
    reset(userData);
  }, [userData, reset]);

  const onSubmit = async (data) => {
    try {
      // const formData = new FormData();
      // // formData.append("avatar", data.avatar[0]);
      // formData.set("gender", data.gender);
      // formData.set("name", data.name);
      // formData.set("email", data.email);

      // formData.set("outdatedPassword", data.outdatedPassword);
      // formData.set("newPassword", data.newPassword);

      const jsonData = {
        gender: data.gender,
        userName: data.userName,
        email: data.email,
      };

      dispatch(updateUserInfo(jsonData))
        .unwrap()
        .then(() => {
          console.log("User update success");
          console.log(JSON.stringify(jsonData, null, 2));
        })
        .catch((err) => {
          console.log("User updating error", err);
        });

      // onUpdate(response.data);
      onClose();
      reset();
    } catch (error) {
      alert("Failed to update user data: " + error.message);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    // setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    // formData.append("avatar", userData.avatar[0]);
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

  return (
    <BaseModal onClose={onClose} isShow={isShow} title="Setting">
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.modal.content}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={css.formGroup}>
              <label className={css.label}>Your photo</label>
              <div className={css.photoUploadContainer}>
                <input
                  type="file"
                  {...register("photo")}
                  onChange={handleAvatarChange}
                  accept="image/*"
                />

                {errors.avatar && <p>{errors.avatar.message}</p>}
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
                      <input
                        type="radio"
                        value="Woman"
                        {...register("gender")}
                      />{" "}
                      Woman
                    </label>
                    <label>
                      <input type="radio" value="Man" {...register("gender")} />{" "}
                      Man
                    </label>
                    {errors.gender && <p>{errors.gender.message}</p>}
                  </div>
                </div>

                <div className={css.formGroup}>
                  <label className={css.label}>Your name</label>
                  <input
                    className={css.input}
                    type="text"
                    {...register("userName")}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div className={css.formGroup}>
                  <label className={css.label}>E-mail</label>
                  <input
                    className={css.input}
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
              </div>

              <div className={css.input2}>
                <div className={css.formGroup}>
                  <label className={css.label}>Password</label>
                  <p>Outdated password:</p>
                  <div className={css.inputWrap}>
                    <input
                      className={css.input}
                      type={showOutdatedPassword ? "text" : "password"}
                      {...register("outdatedPassword")}
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
                  {errors.outdatedPassword && (
                    <p>{errors.outdatedPassword.message}</p>
                  )}
                </div>
                <div className={css.formGroup}>
                  <label>New Password:</label>
                  <div className={css.inputWrap}>
                    <input
                      className={css.input}
                      type={showNewPassword ? "text" : "password"}
                      {...register("newPassword")}
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
                  {errors.newPassword && <p>{errors.newPassword.message}</p>}
                </div>
                <div className={css.formGroup}>
                  <label>Repeat new password:</label>
                  <div className={css.inputWrap}>
                    <input
                      className={css.input}
                      type={showConfirmNewPassword ? "text" : "password"}
                      {...register("confirmNewPassword")}
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
                  {errors.confirmNewPassword && (
                    <p>{errors.confirmNewPassword.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className={css.contBtn}>
              <button className={css.saveBtn} type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </BaseModal>
  );
};

export default SettingModal;
