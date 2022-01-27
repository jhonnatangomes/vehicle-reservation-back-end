/* eslint-disable indent */

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity()
export default class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @ManyToOne(() => User)
    user: User;
}
