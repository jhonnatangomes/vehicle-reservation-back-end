/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import AlreadyExistingUserError from "../errors/AlreadyExistingUserError";
import InvalidDataError from "../errors/InvalidDataError";
import InvalidLoginError from "../errors/InvalidLoginError";
import UnauthorizedError from "../errors/UnauthorizedError";

export default function errorMiddleware(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (process.env.NODE_ENV !== "test") {
        console.log(err);
    }
    if (err instanceof InvalidDataError) {
        return res.status(400).send({
            message: err.message,
            details: err.details,
        });
    }

    if (err instanceof InvalidLoginError) {
        return res.status(404).send({ message: err.message });
    }

    if (err instanceof AlreadyExistingUserError) {
        return res.status(409).send({ message: err.message });
    }

    if (err instanceof UnauthorizedError) {
        return res.status(401).send({ message: err.message });
    }

    return res.sendStatus(500);
}
