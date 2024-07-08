export interface IAuth {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
}

export interface IResetPassword
  extends Pick<IAuth, "password" | "confirmPassword"> {
  token: string;
}

export interface IChangePassword {
  newPassword: string;
  oldPassword: string;
  token: string;
}

export type IForgotPassword = Pick<IAuth, "email">;
