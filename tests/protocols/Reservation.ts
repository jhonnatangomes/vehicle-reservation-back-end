import { Vehicle } from "./Vehicle";

export interface Reservation {
    id: number;
    vehicle: Vehicle;
    createdAt: Date;
    returnDate: Date;
    totalToPay: number;
    daysRented: number;
    isDelayed: boolean;
    totalDelayFee: number;
}
