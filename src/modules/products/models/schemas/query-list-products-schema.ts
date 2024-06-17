import Joi from "joi";

export const queryListProductsSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  sort: Joi.string().optional(),
  search: Joi.string().optional(),
});
