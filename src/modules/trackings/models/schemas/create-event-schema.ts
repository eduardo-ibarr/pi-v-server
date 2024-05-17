import Joi from "joi";

export const createEventSchema = Joi.object({
  event_type: Joi.string().valid("page_view", "product_view").required(),
  timestamp: Joi.date().required(),
  user_id: Joi.number().required(),
  ip: Joi.string().required(),
  user_agent: Joi.string().required(),
  referrer: Joi.string().optional(),
});
