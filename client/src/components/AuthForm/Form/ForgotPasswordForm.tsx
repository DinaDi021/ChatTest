import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector, useToggle } from "../../../hooks";
import { IForgotPassword } from "../../../interfaces";
import { authActions } from "../../../redux";
import styles from "./Form.module.scss";

const ForgotPasswordForm: FC = () => {
  const { register, reset, handleSubmit } = useForm<IForgotPassword>();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const { value: isFormVisible, change: toggleFormVisibility } =
    useToggle(true);

  const forgotPassword: SubmitHandler<IForgotPassword> = async (data) => {
    const { email } = data;

    const {
      meta: { requestStatus },
    } = await dispatch(authActions.forgotPassword({ email }));

    if (requestStatus === "fulfilled") {
      reset();
      toggleFormVisibility();
    }
  };

  return (
    <>
      {isFormVisible ? (
        <form
          className={styles.form__login}
          onSubmit={handleSubmit(forgotPassword)}
        >
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
          {error && <span className={styles.errMessage}>{error.message}</span>}
          <button>Reset the password</button>
        </form>
      ) : (
        <div>
          <h3 className={styles.emailMessage}>
            Password reset successful! Please check your email.
          </h3>
        </div>
      )}
    </>
  );
};

export { ForgotPasswordForm };
