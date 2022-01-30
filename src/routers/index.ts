import { Router } from "express";

import authRouter from "./auth";
import vehicleRouter from "./vehicle";
import reservationRouter from "./reservation";

import authenticationMiddleware from "../middlewares/authenticationMiddleware";

const router = Router();

router.use("/", authRouter);
router.use("/vehicles", authenticationMiddleware, vehicleRouter);
router.use("/reservation", authenticationMiddleware, reservationRouter);

export default router;
