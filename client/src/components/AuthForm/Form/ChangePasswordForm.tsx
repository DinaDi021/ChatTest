import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IChangePassword } from "../../../interfaces";
import { authActions } from "../../../redux";
import styles from "./Form.module.scss";

const ChangePasswordForm: FC = () => {
  const { register, reset, handleSubmit } = useForm<IChangePassword>();

  const dispatch = useAppDispatch();
  const { token } = useParams();
  const { error } = useAppSelector((state) => state.auth);

  const changePassword: SubmitHandler<IChangePassword> = async (data) => {
    const { oldPassword, newPassword } = data;

    const {
      meta: { requestStatus },
    } = await dispatch(
      authActions.changePassword({ oldPassword, newPassword, token }),
    );

    if (requestStatus === "fulfilled") {
      reset();
    }
  };

  return (
    <>
      <form
        className={styles.form__changePassword}
        onSubmit={handleSubmit(changePassword)}
      >
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <LockOutlinedIcon />
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
          <label className={styles.form__label}>
            <LockOutlinedIcon />
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
      {error && <div className={styles.form__error}>{error.message}</div>}
    </>
  );
};

export { ChangePasswordForm };
