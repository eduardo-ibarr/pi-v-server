import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  role: Joi.string().required(),
  address: Joi.string().required(),
  birth_date: Joi.date().required(),
  gender: Joi.string().required(),
});
