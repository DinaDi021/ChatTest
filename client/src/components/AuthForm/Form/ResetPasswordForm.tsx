import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch } from "../../../hooks";
import { IResetPassword } from "../../../interfaces";
import { authActions } from "../../../redux";
import styles from "./Form.module.scss";

const ResetPasswordForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionToken } = useParams();

  const resetPassword: SubmitHandler<IResetPassword> = async (newPassword) => {
    const { password } = newPassword;
    const {
      meta: { requestStatus },
    } = await dispatch(
      authActions.setForgotPassword({ actionToken, newPassword: password }),
    );

    if (requestStatus === "fulfilled") {
      reset();
      navigate("/login");
    }
  };

  return (
    <>
      <form
        className={styles.form__login}
        onSubmit={handleSubmit(resetPassword)}
      >
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
          {errors.password && (
            <div className={styles.form__error}>
              {errors?.password && <span>invalid password</span>}
            </div>
          )}
        </div>
        <div className={styles.form__container}>
          <div className={styles.form__svg}>
            <LockOutlinedIcon />
          </div>
          <label className={styles.form__label}>
            <input
              className={styles.form__input}
              type="password"
              placeholder={"Confirm password"}
              required={true}
              {...register("confirmPassword")}
            />
          </label>
          {errors.confirmPassword && (
            <div className={styles.form__error}>
              {errors?.confirmPassword && <span>passwords do not match</span>}
            </div>
          )}
        </div>
        <button>Confirm password change</button>
      </form>
    </>
  );
};

export { ResetPasswordForm };
