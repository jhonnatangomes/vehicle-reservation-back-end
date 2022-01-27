import { Router } from "express";
import * as controller from "../controllers/auth";
import schemaValidationMiddleware from "../middlewares/schemaValidationMiddleware";
import userSchema from "../schemas/userSchema";

const router = Router();

router.post(
    "/sign-up",
    schemaValidationMiddleware(userSchema),
    controller.signUp
);

export default router;
