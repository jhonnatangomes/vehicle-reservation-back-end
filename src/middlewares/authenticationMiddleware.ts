import { NextFunction, Request, Response } from "express";
import Session from "../entities/Session";
import UnauthorizedError from "../errors/UnauthorizedError";

export default async function authenticationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            throw new UnauthorizedError();
        }

        const session = await Session.getSessionByToken(token);
        if (!session) {
            throw new UnauthorizedError();
        }

        res.locals.id = session.user.id;
        res.locals.token = session.token;
        next();
    } catch (error) {
        next(error);
    }
}
