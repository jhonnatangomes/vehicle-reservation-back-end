import { Router } from "express";
import * as controller from "../controllers/vehicle";

const router = Router();

router.get("/", controller.getVehicles);

export default router;
