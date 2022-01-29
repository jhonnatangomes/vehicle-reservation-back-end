/* eslint-disable indent */
import {
    BaseEntity,
    Column,
    CreateDateColumn,
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

    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt: Date;

    @Column({ type: "timestamp with time zone", nullable: true })
    returnDate: Date;

    @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
    totalToPay: number;
}
