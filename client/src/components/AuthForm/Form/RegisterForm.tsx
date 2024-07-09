import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IAuth } from "../../../interfaces";
import { authActions } from "../../../redux";
import styles from "./Form.module.scss";

const RegisterForm: FC = () => {
  const { register, reset, handleSubmit } = useForm<IAuth>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);
  const registerUser: SubmitHandler<IAuth> = async (user) => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.register({ user }));

    if (requestStatus === "fulfilled") {
      const loginResponse = await dispatch(authActions.login({ user }));
      if (loginResponse.meta.requestStatus === "fulfilled") {
        reset();
        navigate("/me");
      }
    }
  };

  return (
    <>
      <form
        className={styles.form__register}
        onSubmit={handleSubmit(registerUser)}
      >
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <PersonRoundedIcon />
            <input
              className={styles.form__input}
              type="text"
              placeholder={"First Name"}
              required={true}
              {...register("firstName")}
            />
          </label>
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <PersonRoundedIcon />
            <input
              className={styles.form__input}
              type="text"
              placeholder={"Last Name"}
              required={true}
              {...register("lastName")}
            />
          </label>
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <PhoneIphoneIcon />
            <input
              className={styles.form__input}
              type="text"
              placeholder={"+380xxxxxxxx"}
              required={true}
              {...register("phoneNumber")}
            />
          </label>
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <EmailOutlinedIcon />
            <input
              className={styles.form__input}
              type="email"
              placeholder={"Email"}
              required={true}
              {...register("email")}
            />
          </label>
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <LockOutlinedIcon />
            <input
              className={styles.form__input}
              type="password"
              placeholder={"Password"}
              required={true}
              {...register("password")}
            />
          </label>
        </div>
        {error && <span className={styles.errMessage}>{error.message}</span>}
        <button>Create Account</button>
      </form>
    </>
  );
};

export { RegisterForm };
