import { Router } from "express";
import * as controller from "../controllers/auth";
import authenticationMiddleware from "../middlewares/authenticationMiddleware";
import schemaValidationMiddleware from "../middlewares/schemaValidationMiddleware";
import signInSchema from "../schemas/signInSchema";
import signUpSchema from "../schemas/signUpSchema";

const router = Router();

router.post(
    "/sign-up",
    schemaValidationMiddleware(signUpSchema),
    controller.signUp
);

router.post(
    "/sign-in",
    schemaValidationMiddleware(signInSchema),
    controller.login
);

router.post("/logout", authenticationMiddleware, controller.logout);

export default router;
