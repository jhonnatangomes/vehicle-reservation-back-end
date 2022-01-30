import faker from "@faker-js/faker";
import Reservation from "../../src/entities/Reservation";
import User from "../../src/entities/User";
import getRandomElement from "../utils/getRandomElement";
import VehicleFactory from "./VehicleFactory";

interface ReservationBody {
    vehicleId: number | string;
    daysRented: number | string;
}

export default class ReservationFactory {
    static getWrongReservationBody(): ReservationBody {
        const params = {
            vehicleId: faker.datatype.number(),
            daysRented: faker.datatype.number(),
        };
        const wrongParams = [
            {
                ...params,
                vehicleId: faker.datatype.string(),
            },
            {
                ...params,
                daysRented: faker.datatype.string(),
            },
        ];
        return getRandomElement(wrongParams);
    }

    static async createPreviousReservation(userId?: number) {
        const vehicle = await VehicleFactory.createVehicles(1);
        if (userId) {
            const user = await User.findOne({ id: userId });
            const reservation = await Reservation.createReservation(
                user,
                vehicle[0],
                10
            );
            return reservation;
        }
        const newUser = await User.createUser(
            faker.name.findName(),
            faker.internet.email(),
            faker.internet.password()
        );
        const reservation = await Reservation.createReservation(
            newUser,
            vehicle[0],
            10
        );
        return reservation;
    }
}
