import { NextFunction, Request, Response } from "express";
import * as service from "../services/reservation";

async function reserveVehicle(req: Request, res: Response, next: NextFunction) {
    try {
        const { vehicleId, daysRented } = req.body;
        const reservation = await service.reserveVehicle(
            res.locals.id,
            vehicleId,
            daysRented
        );
        res.send(reservation);
    } catch (error) {
        next(error);
    }
}

async function returnVehicle(req: Request, res: Response, next: NextFunction) {
    try {
        const { vehicleId } = req.body;
        const reservation = await service.returnVehicle(
            res.locals.id,
            vehicleId
        );
        res.send(reservation);
    } catch (error) {
        next(error);
    }
}

async function getReservation(req: Request, res: Response, next: NextFunction) {
    try {
        const reservation = await service.getReservation(res.locals.id);
        res.send(reservation);
    } catch (error) {
        next(error);
    }
}

export { reserveVehicle, returnVehicle, getReservation };
