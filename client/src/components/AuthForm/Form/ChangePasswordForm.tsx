import { joiResolver } from "@hookform/resolvers/joi";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IChangePassword } from "../../../interfaces";
import { authActions } from "../../../redux";
import { changePasswordSchema } from "../../../validators";
import styles from "./Form.module.scss";

const ChangePasswordForm: FC = () => {
  const { register, reset, handleSubmit } = useForm<IChangePassword>({
    resolver: joiResolver(changePasswordSchema),
  });

  const dispatch = useAppDispatch();
  const { token } = useParams();
  const { error } = useAppSelector((state) => state.auth);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
  const changePassword: SubmitHandler<IChangePassword> = async (data) => {
    const { oldPassword, newPassword } = data;

    const {
      meta: { requestStatus },
    } = await dispatch(
      authActions.changePassword({ oldPassword, newPassword, token }),
    );

    if (requestStatus === "fulfilled") {
      setChangePasswordSuccess(true);
      reset();
    } else {
      setChangePasswordSuccess(false);
    }
  };

  return (
    <>
      <form
        className={styles.form__changePassword}
        onSubmit={handleSubmit(changePassword)}
      >
        <div className={styles.form__container}>
          <div className={styles.form__svg}>
            <LockOutlinedIcon />
          </div>
          <label className={styles.form__label}>
            <input
              className={styles.form__input}
              type="password"
              placeholder={"Old Password"}
              required={true}
              {...register("oldPassword")}
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
              placeholder={"New Password"}
              required={true}
              {...register("newPassword")}
            />
          </label>
        </div>
        <button>Confirm password change</button>
      </form>
      {error && <span className={styles.errMessage}>{error.message}</span>}
      {changePasswordSuccess && (
        <span className={styles.form__success}>
          Password changed successfully!
        </span>
      )}
    </>
  );
};

export { ChangePasswordForm };
