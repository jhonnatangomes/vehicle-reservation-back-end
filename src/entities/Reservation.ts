/* eslint-disable indent */
import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import Vehicle from "./Vehicle";

@Entity("reservations")
export default class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    user: User;

    @OneToOne(() => Vehicle)
    vehicle: Vehicle;
}
