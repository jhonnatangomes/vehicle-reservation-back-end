import { VehicleImage } from "./Image";

export interface Vehicle {
    id: number;
    name: string;
    images: VehicleImage[];
    pricePerDay: number;
}
