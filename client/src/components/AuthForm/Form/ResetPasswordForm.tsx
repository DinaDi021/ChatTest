// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { FC } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useNavigate, useSearchParams } from "react-router-dom";
//
// import { useAppDispatch } from "../../../hooks";
// import { IResetPassword } from "../../../interfaces";
// import { authActions } from "../../../redux";
// import styles from "./Form.module.scss";
//
// const ResetPasswordForm: FC = () => {
//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IResetPassword>();
//
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token");
//   console.log(token);
//
//   const resetPassword: SubmitHandler<IResetPassword> = async (newPassword) => {
//     const { password } = newPassword;
//     console.log(token, password);
//     const {
//       meta: { requestStatus },
//     } = await dispatch(
//       authActions.setForgotPassword({ token: token, newPassword: password }),
//     );
//
//     if (requestStatus === "fulfilled") {
//       reset();
//       navigate("/login");
//     }
//   };
//
//   return (
//     <>
//       <form
//         className={styles.form__login}
//         onSubmit={handleSubmit(resetPassword)}
//       >
//         <div className={styles.form__container}>
//           <label className={styles.form__label}>
//             <EmailOutlinedIcon />
//             <input
//               className={styles.form__input}
//               type="password"
//               placeholder={"Password"}
//               required={true}
//               {...register("password")}
//             />
//           </label>
//           {errors.password && (
//             <div className={styles.form__error}>
//               {errors?.password && <span>invalid password</span>}
//             </div>
//           )}
//         </div>
//         <div className={styles.form__container}>
//           <label className={styles.form__label}>
//             <LockOutlinedIcon />
//             <input
//               className={styles.form__input}
//               type="password"
//               placeholder={"Confirm password"}
//               required={true}
//               {...register("confirmPassword")}
//             />
//           </label>
//           {errors.confirmPassword && (
//             <div className={styles.form__error}>
//               {errors?.confirmPassword && <span>passwords do not match</span>}
//             </div>
//           )}
//         </div>
//         <button>Confirm password change</button>
//       </form>
//     </>
//   );
// };
//
// export { ResetPasswordForm };
export {};
