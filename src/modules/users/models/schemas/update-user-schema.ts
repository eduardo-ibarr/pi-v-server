import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  address: Joi.string(),
  birth_date: Joi.date(),
});
