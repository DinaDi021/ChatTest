import joi from "joi";

import { regexConstant } from "../constatnts/regex.constant";

export class UserValidator {
  static firstName = joi.string().min(2).max(50);
  static lastName = joi.string().min(2).max(50);
  static email = joi.string().regex(regexConstant.EMAIL).trim();
  static password = joi.string().regex(regexConstant.PASSWORD).trim();
  static phoneNumber = joi.string().regex(regexConstant.PHONE_NUMBER).trim();

  static update = joi.object({
    firstName: this.firstName,
    lastName: this.lastName,
    phoneNumber: this.phoneNumber,
  });

  static registerUser = joi.object({
    firstName: this.firstName.required(),
    lastName: this.lastName.required(),
    email: this.email.required(),
    password: this.password.required(),
    phoneNumber: this.phoneNumber.required(),
  });

  static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static forgotPassword = joi.object({
    email: this.email.required(),
  });

  static setForgotPassword = joi.object({
    newPassword: this.password.required(),
  });

  static changePassword = joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
}
