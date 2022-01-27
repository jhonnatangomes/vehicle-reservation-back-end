/* eslint-disable func-names */
import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import InvalidDataError from "../errors/InvalidDataError";

export default function schemaValidationMiddleware(schema: Schema) {
    return function (req: Request, _res: Response, next: NextFunction) {
        const validation = schema.validate(req.body);

        if (validation.error) {
            throw new InvalidDataError(
                "body",
                validation.error.details.map((error) => error.message)
            );
        }

        next();
    };
}
