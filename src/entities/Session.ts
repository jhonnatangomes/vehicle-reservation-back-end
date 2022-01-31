/* eslint-disable indent */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import User from "./User";

@Entity("sessions")
export default class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @ManyToOne(() => User, { eager: true })
    user: User;

    static async getSessionByToken(token: string) {
        const session = await this.findOne({ token });
        return session;
    }

    static async createSession(user: User) {
        const token = uuid();
        const session = this.create({ user, token });
        await this.save(session);
        return session;
    }

    static async deleteSession(token: string) {
        await this.delete({ token });
    }

    getSession() {
        return {
            user: {
                name: this.user.name,
                email: this.user.email,
            },
            token: this.token,
        };
    }
}
