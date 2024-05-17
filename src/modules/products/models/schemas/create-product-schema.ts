import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().required(),
  image_url: Joi.string(),
  category_id: Joi.number().required(),
  is_active: Joi.boolean(),
  stock_quantity: Joi.number().required(),
  brand: Joi.string().required(),
  size: Joi.string().required(),
  color: Joi.string().required(),
});
