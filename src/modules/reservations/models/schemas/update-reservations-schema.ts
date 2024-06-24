import Joi from "joi";

export const updateReservationSchema = Joi.object({
  total_amount: Joi.number().positive().label("Total Amount"),
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
    .label("Reservation Items"),
});
