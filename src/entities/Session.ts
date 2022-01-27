/* eslint-disable indent */

import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@Entity("sessions")
export default class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @ManyToOne(() => User)
    user: User;

    static async getSessionByToken(token: string) {
        const session = await this.findOne({ token });
        return session;
    }

    static async createSession(token: string, user: User) {
        const session = this.create({ user, token });
        await this.save(session);
        return session;
    }

    getSession() {
        return {
            user: {
                name: this.user.name,
            },
            token: this.token,
        };
    }
}
