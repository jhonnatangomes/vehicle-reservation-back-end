import User from "../entities/User";
import Session from "../entities/Session";
import AlreadyExistingUserError from "../errors/AlreadyExistingUserError";
import InvalidLoginError from "../errors/InvalidLoginError";

async function createUser(name: string, email: string, password: string) {
    const user = await User.getUserByEmail(email);
    if (user) {
        throw new AlreadyExistingUserError();
    }
    const newUser = await User.createUser(name, email, password);
    return newUser;
}

async function login(email: string, password: string) {
    const user = await User.getUserByEmail(email);
    if (!user) {
        throw new InvalidLoginError();
    }

    if (!User.isValidPassword(password, user.password)) {
        throw new InvalidLoginError();
    }

    const session = await Session.createSession(user);
    return session.getSession();
}

async function logout(token: string) {
    await Session.deleteSession(token);
}

export { createUser, login, logout };
