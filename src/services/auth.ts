import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import User from "../entities/User";
import AlreadyExistingUserError from "../errors/AlreadyExistingUserError";

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

export { createUser };
