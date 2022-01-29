/* eslint-disable indent */
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import VehicleImage from "./Image";

@Entity("vehicles")
export default class Vehicle extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => VehicleImage, (image) => image.vehicle, { eager: true })
    images: VehicleImage[];

    static async getVehicles() {
        const vehicles = await this.find();
        return vehicles;
    }
}
