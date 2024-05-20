import Joi from "joi";

export const createProductViewSchema = Joi.object({
  product_id: Joi.number().required(),
  event_type: Joi.string().valid("page_view", "product_view").required(),
  user_id: Joi.optional(),
});
