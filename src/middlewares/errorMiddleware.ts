/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import InvalidDataError from "../errors/InvalidDataError";

export default function errorMiddleware(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    console.log(err);
    if (err instanceof InvalidDataError) {
        return res.status(400).send({
            message: err.message,
            details: err.details,
        });
    }

    return res.sendStatus(500);
}
