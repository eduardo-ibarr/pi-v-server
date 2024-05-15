import Joi from "joi";

export const updateCategorySchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  is_active: Joi.boolean(),
});
