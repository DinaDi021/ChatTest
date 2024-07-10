import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IAuth } from "../../../interfaces";
import { authActions } from "../../../redux";
import styles from "./Form.module.scss";

const LoginForm: FC = () => {
  const { register, reset, handleSubmit } = useForm<IAuth>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);
  const login: SubmitHandler<IAuth> = async (user) => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.login({ user }));

    if (requestStatus === "fulfilled") {
      reset();
      navigate("/me");
    }
  };

  return (
    <>
      <form className={styles.form__login} onSubmit={handleSubmit(login)}>
        <div className={styles.form__container}>
          <div className={styles.form__svg}>
            <EmailOutlinedIcon />
          </div>
          <label className={styles.form__label}>
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
          <div className={styles.form__svg}>
            <LockOutlinedIcon />
          </div>
          <label className={styles.form__label}>
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
        <button>Log in</button>
      </form>
    </>
  );
};

export { LoginForm };
