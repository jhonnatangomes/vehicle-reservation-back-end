import { Request, Response } from "express";
import * as service from "../services/auth";

async function signUp(req: Request, res: Response) {
    const { name, email, password } = req.body;
    await service.createUser(name, email, password);
    res.sendStatus(201);
}

export { signUp };
