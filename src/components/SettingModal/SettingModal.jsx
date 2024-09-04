import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "../Icon/Icon";
import { selectUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar, updateUserInfo } from "../../redux/auth/operations";
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

const SettingModal = ({ isOpen, onClose, onUpdate }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const [preview, setPreview] = useState(null);
  const [showOutdatedPassword, setshowOutdatedPassword] = useState(false);
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
  // const handleBackdropClick = (e) => {
  //   if (e.target === e.currentTarget) {
  //     onClose();
  //   }
  // };

  //   useEffect(() => {
  //     const handleEscape = (e) => {
  //       if (e.key === "Escape") {
  //         onClose();
  //       }
  //     };
  //     document.addEventListener("keydown", handleEscape);
  //     return () => {
  //       document.removeEventListener("keydown", handleEscape);
  //     };
  //   }, [onClose]);

  //   if (!isOpen) return null;

  return (
    <BaseModal isShow={isOpen} onClose={onClose} title="Settings">
      <div className="modal-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Your photo</label>
          <div className="form-group">
            <input
              type="file"
              {...register("photo")}
              onChange={handleAvatarChange}
            />
            {errors.avatar && <p>{errors.avatar.message}</p>}
            {preview && <img src={preview} alt="Avatar Preview" />}
            <button type="button">Upload a photo</button>
          </div>

          <div className="form-group">
            <label>Your gender identity</label>
            <label>
              <input type="radio" value="Woman" {...register("gender")} /> Woman
            </label>
            <label>
              <input type="radio" value="Man" {...register("gender")} /> Man
            </label>
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          <div className="form-group">
            <label>Your name</label>
            <input
              type="text"
              {...register("userName")}
              placeholder="Enter your name"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <p>Outdated password:</p>
            <input
              type={showOutdatedPassword ? "text" : "password"}
              {...register("outdatedPassword")}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setshowOutdatedPassword(!showOutdatedPassword)} // Перемикання виду пароля
            >
              <Icon id={showOutdatedPassword ? "eye" : "slash"} className="" />
            </button>
            {errors.outdatedPassword && (
              <p>{errors.outdatedPassword.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>New Password:</label>

            <input
              type={showNewPassword ? "text" : "password"} // Зміна типу інпуту
              {...register("newPassword")}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)} // Перемикання виду пароля
            >
              <Icon id={showNewPassword ? "eye" : "slash"} className="" />
            </button>
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
          </div>
          <div className="form-group">
            <label>Repeat new password:</label>

            <input
              type={showConfirmNewPassword ? "text" : "password"} // Зміна типу інпуту
              {...register("confirmNewPassword")}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} // Перемикання виду пароля
            >
              <Icon
                id={showConfirmNewPassword ? "eye" : "slash"}
                className=""
              />
            </button>
            {errors.confirmNewPassword && (
              <p>{errors.confirmNewPassword.message}</p>
            )}
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </BaseModal>
  );
};

export default SettingModal;
