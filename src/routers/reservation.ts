import { Router } from "express";
import * as controller from "../controllers/reservation";
import schemaValidationMiddleware from "../middlewares/schemaValidationMiddleware";
import reservationSchema from "../schemas/reservationSchema";
import returnVehicleSchema from "../schemas/returnVehicleSchema";

const router = Router();

router.post(
    "/",
    schemaValidationMiddleware(reservationSchema),
    controller.reserveVehicle
);
router.post(
    "/return",
    schemaValidationMiddleware(returnVehicleSchema),
    controller.returnVehicle
);

export default router;
