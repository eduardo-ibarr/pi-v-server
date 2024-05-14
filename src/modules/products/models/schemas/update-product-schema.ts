import Joi from "joi";

export const updateProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  image_url: Joi.string(),
  category_id: Joi.number(),
  is_active: Joi.boolean(),
});
