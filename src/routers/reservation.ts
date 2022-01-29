import { Router } from "express";
import * as controller from "../controllers/reservation";

const router = Router();

router.post("/", controller.reserveVehicle);

export default router;
