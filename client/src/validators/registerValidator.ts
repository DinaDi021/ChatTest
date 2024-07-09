import Joi from "joi";

import { regex } from "../constants";

const setPasswordSchema = Joi.object({
  password: Joi.string().regex(regex.PASSWORD).trim(),
  confirm_Password: Joi.any().valid(Joi.ref("password")).required(),
});

export { setPasswordSchema };
