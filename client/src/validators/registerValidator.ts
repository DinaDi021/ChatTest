import Joi from "joi";

import { regex } from "../constants";

const setPasswordSchema = Joi.object({
  password: Joi.string().regex(regex.PASSWORD).trim(),
  confirm_Password: Joi.any().valid(Joi.ref("password")).required(),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().regex(regex.PASSWORD).trim(),
  newPassword: Joi.string().regex(regex.PASSWORD).trim(),
});

const updateShema = Joi.object({
  firstName: Joi.string().min(2).max(50).trim().optional(),
  lastName: Joi.string().min(2).max(50).trim().optional(),
  phoneNumber: Joi.string().regex(regex.PHONE_NUMBER).trim().optional(),
});

export { setPasswordSchema, updateShema, changePasswordSchema };
