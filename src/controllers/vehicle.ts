import { NextFunction, Request, Response } from "express";
import * as service from "../services/vehicle";

async function getVehicles(req: Request, res: Response, next: NextFunction) {
    try {
        const vehicles = await service.getVehicles();
        res.send(vehicles);
    } catch (error) {
        next(error);
    }
}

export { getVehicles };
