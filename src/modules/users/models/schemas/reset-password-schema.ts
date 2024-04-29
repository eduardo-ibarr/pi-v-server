import Joi from "joi";

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.string().required(),
  password: Joi.string().required(),
});
