import Joi from "joi";

export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  image_url: Joi.string().optional(),
  category_id: Joi.number().optional(),
  is_active: Joi.boolean().optional(),
});
