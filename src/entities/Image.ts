/* eslint-disable indent */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Vehicle from "./Vehicle";

@Entity("images")
export default class VehicleImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    color: string;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.images)
    vehicle: Vehicle;
}
