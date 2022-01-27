import { NextFunction, Request, Response } from "express";
import * as service from "../services/auth";

async function signUp(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    try {
        await service.createUser(name, email, password);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
        const session = await service.login(email, password);
        res.send(session);
    } catch (error) {
        next(error);
    }
}

async function logout(_req: Request, res: Response, next: NextFunction) {
    const { token } = res.locals;
    try {
        await service.logout(token);
    } catch (error) {
        next(error);
    }
}

export { signUp, login, logout };
