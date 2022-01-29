import { NextFunction, Request, Response } from "express";
import InvalidDataError from "../errors/InvalidDataError";
import * as service from "../services/reservation";

async function reserveVehicle(req: Request, res: Response, next: NextFunction) {
    try {
        const { vehicleId } = req.body;
        if (vehicleId === undefined) {
            throw new InvalidDataError(["vehicleId is required"]);
        }
        if (typeof vehicleId !== "number") {
            throw new InvalidDataError(["vehicleId must be a number"]);
        }
        const reservation = await service.reserveVehicle(
            res.locals.id,
            vehicleId
        );
        res.send(reservation);
    } catch (error) {
        next(error);
    }
}

export { reserveVehicle };
