/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import ConflictError from "../errors/ConflictError";
import InvalidDataError from "../errors/InvalidDataError";
import NotFoundError from "../errors/NotFoundError";
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

    if (err instanceof UnauthorizedError) {
        return res.status(401).send({ message: err.message });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).send({ message: err.message });
    }

    if (err instanceof ConflictError) {
        return res.status(409).send({ message: err.message });
    }

    return res.sendStatus(500);
}
