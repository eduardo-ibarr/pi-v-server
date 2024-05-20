import Joi from "joi";

export const createPageViewSchema = Joi.object({
  url: Joi.string().required(),
  event_type: Joi.string().valid("page_view", "product_view").required(),
  user_id: Joi.optional(),
});
