/* eslint-disable indent */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import Vehicle from "./Vehicle";

@Entity("images")
export default class VehicleImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    color: string;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.images)
    vehicle: Vehicle;
}
