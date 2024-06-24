import Joi from "joi";

export const createReservationSchema = Joi.object({
  user_id: Joi.number().required().label("User ID"),
  total_amount: Joi.number().positive().required().label("Total Amount"),
  reservation_items: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.number().required().label("Product ID"),
        price: Joi.number().positive().required().label("Price"),
        quantity: Joi.number()
          .integer()
          .positive()
          .required()
          .label("Quantity"),
      })
    )
    .min(1)
    .required()
    .label("Reservation Items"),
});
