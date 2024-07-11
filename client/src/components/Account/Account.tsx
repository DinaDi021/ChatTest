import { joiResolver } from "@hookform/resolvers/joi";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import React, { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import css from "../../components/AuthForm/Form/Form.module.scss";
import { useAppDispatch, useAppSelector, useToggle } from "../../hooks";
import { IUpdateProfileParams } from "../../interfaces";
import { authActions, usersActions } from "../../redux";
import { updateShema } from "../../validators";
import { ChangePasswordForm } from "../AuthForm";
import styles from "./Account.module.scss";

const Account: FC = () => {
  const { me } = useAppSelector((state) => state.auth);
  const { id, email, emailVerified, firstName, lastName, phoneNumber } = me;
  const dispatch = useAppDispatch();
  const {
    value: isChangePasswordFormVisible,
    change: togglePasswordFormVisible,
  } = useToggle(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdateProfileParams>({
    resolver: joiResolver(updateShema),
  });

  console.log(me);

  useEffect(() => {
    if (me) {
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("phoneNumber", phoneNumber);
    }
  }, [setValue, emailVerified, firstName, lastName, phoneNumber]);

  const update: SubmitHandler<IUpdateProfileParams> = (params) => {
    dispatch(usersActions.updateUserById({ id: id, params }));
  };

  const deleteAccount = async () => {
    const {
      meta: { requestStatus },
    } = await dispatch(usersActions.deleteUserById({ id }));

    if (requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className={styles.user__container}>
      <div className={styles.user__container__info}>
        <form className={css.form__updateInfo} onSubmit={handleSubmit(update)}>
          <div className={css.form__container}>
            <div className={css.form__svg}>
              <PersonRoundedIcon />
            </div>
            <label className={css.form__label}>
              <input
                className={css.form__input}
                type="text"
                placeholder={"First Name"}
                {...register("firstName")}
              />
            </label>
            {errors.firstName && (
              <div className={css.form__error}>
                {errors?.firstName && <span>invalid first Name</span>}
              </div>
            )}
          </div>
          <div className={css.form__container}>
            <div className={css.form__svg}>
              <PersonRoundedIcon />
            </div>
            <label className={css.form__label}>
              <input
                className={css.form__input}
                type="text"
                placeholder={"Last Name"}
                {...register("lastName")}
              />
            </label>
            {errors.lastName && (
              <div className={css.form__error}>
                {errors?.lastName && <span>invalid last Name</span>}
              </div>
            )}
          </div>
          <div className={css.form__container}>
            <div className={css.form__svg}>
              <PhoneIphoneIcon />
            </div>
            <label className={css.form__label}>
              <input
                className={css.form__input}
                type="text"
                placeholder={"+380xxxxxxxx"}
                required={true}
                {...register("phoneNumber")}
              />
            </label>
            {errors.phoneNumber && (
              <div className={css.form__error}>
                {errors?.phoneNumber && <span>invalid phone number</span>}
              </div>
            )}
          </div>
          <button>Update Account</button>
        </form>

        <div className={styles.user__emailVerification}>
          <p>{email}</p>
          {emailVerified ? (
            <p>Email verified - Account confirmed</p>
          ) : (
            <p>Email not verified - Please verify your account</p>
          )}
        </div>
      </div>
      <div className={styles.user__container__action}>
        <div
          className={
            isChangePasswordFormVisible
              ? `${styles.changePasswordForm} ${styles.visible}`
              : styles.changePasswordForm
          }
        >
          <ChangePasswordForm />
        </div>
        <button onClick={togglePasswordFormVisible}>
          {isChangePasswordFormVisible
            ? "Hide Change Password Form"
            : "Change password"}
        </button>
        <button onClick={deleteAccount}>Delete account</button>
      </div>
    </div>
  );
};

export { Account };
