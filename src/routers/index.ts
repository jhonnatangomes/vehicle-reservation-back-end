import { Router } from "express";

import authRouter from "./auth";
import vehicleRouter from "./vehicle";

import authenticationMiddleware from "../middlewares/authenticationMiddleware";

const router = Router();

router.use("/", authRouter);
router.use("/vehicles", authenticationMiddleware, vehicleRouter);

export default router;
