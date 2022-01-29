/* eslint-disable indent */
import dayjs from "dayjs";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    IsNull,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import Vehicle from "./Vehicle";

@Entity("reservations")
export default class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Vehicle, { eager: true })
    @JoinColumn()
    vehicle: Vehicle;

    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt: Date;

    @Column({ type: "timestamp with time zone", nullable: true })
    returnDate: Date;

    @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
    totalToPay: number;

    @Column({ type: "integer" })
    daysRented: number;

    static async createReservation(
        user: User,
        vehicle: Vehicle,
        daysRented: number
    ) {
        const reservation = this.create({ user, vehicle, daysRented });
        await this.save(reservation);
        return reservation;
    }

    static async getUserReservation(user: User) {
        const reservation = await this.findOne({ user, returnDate: IsNull() });
        return reservation;
    }

    static async getVehicleReservation(vehicle: Vehicle) {
        const reservation = await this.findOne({
            vehicle,
            returnDate: IsNull(),
        });
        return reservation;
    }

    static async returnVehicle(user: User, vehicle: Vehicle) {
        const reservation = await this.findOne({
            user,
            vehicle,
            returnDate: IsNull(),
        });
        const now = dayjs();
        const rentalStart = dayjs(reservation.createdAt);
        const daysUsed = now.diff(rentalStart, "days");
        const { pricePerDay } = reservation.vehicle;
        const delayFee = 20;
        let totalToPay = pricePerDay * daysUsed;

        if (daysUsed > reservation.daysRented) {
            const delayedDays = daysUsed - reservation.daysRented;
            totalToPay += delayedDays * delayFee;
        }

        reservation.returnDate = now.toDate();
        reservation.totalToPay = totalToPay;

        await this.save(reservation);
        return reservation;
    }

    getReservation() {
        return {
            vehicle: this.vehicle,
            createdAt: this.createdAt,
            returnDate: this.returnDate,
            totalToPay: this.totalToPay?.toFixed(2) || null,
            daysRented: this.daysRented,
        };
    }
}
