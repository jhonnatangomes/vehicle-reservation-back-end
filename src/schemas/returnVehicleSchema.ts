import Joi from "joi";

const returnVehicleSchema = Joi.object({
    vehicleId: Joi.number().integer().required(),
});

export default returnVehicleSchema;
