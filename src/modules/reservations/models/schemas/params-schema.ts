import Joi from "joi";

export const paramsSchema = Joi.object({
  id: Joi.string().required(),
});
