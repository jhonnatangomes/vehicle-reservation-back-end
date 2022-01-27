import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { getRepository } from "typeorm";
import User from "../entities/User";
import Session from "../entities/Session";
import AlreadyExistingUserError from "../errors/AlreadyExistingUserError";
import InvalidLoginError from "../errors/InvalidLoginError";

async function createUser(name: string, email: string, password: string) {
    const user = await getRepository(User).findOne({ email });
    if (user) {
        throw new AlreadyExistingUserError();
    }
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = getRepository(User).create({
        name,
        email,
        password: hashedPassword,
    });
    await getRepository(User).save(newUser);
    return newUser;
}

async function login(email: string, password: string) {
    const user = await getRepository(User).findOne({ email });
    if (!user) {
        throw new InvalidLoginError();
    }

    const invalidPassword = !bcrypt.compareSync(password, user.password);
    if (invalidPassword) {
        throw new InvalidLoginError();
    }
    const token = uuid();
    const session = getRepository(Session).create({ user, token });
    await getRepository(Session).save(session);
    return session.getSession();
}

export { createUser, login };
