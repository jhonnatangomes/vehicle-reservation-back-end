/* eslint-disable lines-between-class-members */
import { v4 as uuid } from "uuid";
import Session from "../../src/entities/Session";
import UserFactory from "./UserFactory";

export default class SessionFactory {
    static async createSession() {
        const user = new UserFactory();
        const userInDb = await user.createUserInDb();
        const token = uuid();
        const session = await Session.createSession(token, userInDb);
        return session;
    }
}
