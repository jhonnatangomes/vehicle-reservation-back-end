/* eslint-disable indent */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import VehicleImage from "./Image";

@Entity("vehicles")
export default class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => VehicleImage, (image) => image.vehicle)
    images: VehicleImage[];
}
