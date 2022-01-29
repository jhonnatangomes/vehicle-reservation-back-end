/* eslint-disable indent */
import {
    BaseEntity,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import Vehicle from "./Vehicle";

@Entity("reservations")
export default class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToOne(() => Vehicle)
    @JoinColumn()
    vehicle: Vehicle;
}
