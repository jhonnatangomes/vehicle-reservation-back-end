import Joi from "joi";

const reservationSchema = Joi.object({
    vehicleId: Joi.number().integer().required(),
    daysRented: Joi.number().integer().required(),
});

export default reservationSchema;
