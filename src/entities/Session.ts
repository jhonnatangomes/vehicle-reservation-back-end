/* eslint-disable indent */

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity("sessions")
export default class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @ManyToOne(() => User)
    user: User;

    getSession() {
        return {
            user: {
                name: this.user.name,
            },
            token: this.token,
        };
    }
}
