/* eslint-disable lines-between-class-members */
import Session from "../../src/entities/Session";
import UserFactory from "./UserFactory";

export default class SessionFactory {
    static async createSession() {
        const user = new UserFactory();
        const userInDb = await user.createUserInDb();
        const session = await Session.createSession(userInDb);
        return session;
    }
}
