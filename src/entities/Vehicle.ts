/* eslint-disable indent */
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import VehicleImage from "./Image";
import Reservation from "./Reservation";

@Entity("vehicles")
export default class Vehicle extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => VehicleImage, (image) => image.vehicle, { eager: true })
    images: VehicleImage[];

    @OneToMany(() => Reservation, (reservation) => reservation.vehicle)
    reservations: Reservation[];

    @Column({ type: "numeric", precision: 10, scale: 2 })
    pricePerDay: number;

    static async getVehicles() {
        const vehicles = await this.createQueryBuilder("vehicle")
            .leftJoinAndSelect("vehicle.reservations", "reservation")
            .leftJoinAndSelect("vehicle.images", "image")
            .leftJoinAndSelect("reservation.user", "user")
            .where("reservation.returnDate IS NULL")
            .getMany();
        return vehicles.map((vehicle) => ({
            ...vehicle,
            reservations: vehicle.reservations[0]
                ? {
                      ...vehicle.reservations[0],
                      user: {
                          email: vehicle.reservations[0]?.user.email,
                      },
                  }
                : null,
        }));
    }

    static async getVehicle(vehicleId: number) {
        const vehicle = await this.createQueryBuilder("vehicle")
            .leftJoinAndSelect("vehicle.reservations", "reservation")
            .leftJoinAndSelect("vehicle.images", "image")
            .leftJoinAndSelect("reservation.user", "user")
            .where("vehicle.id = :id", { id: vehicleId })
            .getOne();
        return {
            ...vehicle,
            reservations: vehicle.reservations[0]
                ? {
                      ...vehicle.reservations[0],
                      user: {
                          email: vehicle.reservations[0]?.user.email,
                      },
                  }
                : null,
        };
    }

    static async getVehicleById(vehicleId: number) {
        const vehicle = await this.findOne({ id: vehicleId });
        return vehicle;
    }
}
