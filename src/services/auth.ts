import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import User from "../entities/User";
import Session from "../entities/Session";
import AlreadyExistingUserError from "../errors/AlreadyExistingUserError";
import InvalidLoginError from "../errors/InvalidLoginError";

async function createUser(name: string, email: string, password: string) {
    const user = await User.getUserByEmail(email);
    if (user) {
        throw new AlreadyExistingUserError();
    }
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = await User.createUser(name, email, hashedPassword);
    return newUser;
}

async function login(email: string, password: string) {
    const user = await User.getUserByEmail(email);
    if (!user) {
        throw new InvalidLoginError();
    }

    const invalidPassword = !bcrypt.compareSync(password, user.password);
    if (invalidPassword) {
        throw new InvalidLoginError();
    }
    const token = uuid();
    const session = await Session.createSession(token, user);
    return session.getSession();
}

async function logout(token: string) {
    await Session.deleteSession(token);
}

export { createUser, login, logout };
