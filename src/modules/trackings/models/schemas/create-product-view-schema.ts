import Joi from "joi";

export const createProductViewSchema = Joi.object({
  product_id: Joi.number().required(),
  event_type: Joi.string().valid("product_view").required(),
  timestamp: Joi.date().required(),
  user_id: Joi.number().required(),
  ip: Joi.string().required(),
  user_agent: Joi.string().required(),
  referrer: Joi.string().optional(),
});
