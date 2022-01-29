import Reservation from "../entities/Reservation";
import User from "../entities/User";
import Vehicle from "../entities/Vehicle";
import InvalidReservationError from "../errors/InvalidReservationError";
import InvalidReturnError from "../errors/InvalidReturnError";
import VehicleNotFoundError from "../errors/VehicleNotFoundError";

async function reserveVehicle(
    userId: number,
    vehicleId: number,
    daysRented: number
) {
    const user = await User.getUserById(userId);
    const vehicle = await Vehicle.getVehicleById(vehicleId);

    if (!vehicle) {
        throw new VehicleNotFoundError();
    }

    const userReservation = await Reservation.getUserReservation(user);
    if (userReservation) {
        throw new InvalidReservationError("O usuário já possui uma reserva.");
    }

    const vehicleReservation = await Reservation.getVehicleReservation(vehicle);
    if (vehicleReservation) {
        throw new InvalidReservationError("O veículo já está reservado.");
    }

    const newReservation = await Reservation.createReservation(
        user,
        vehicle,
        daysRented
    );
    return newReservation.getReservation();
}

async function returnVehicle(userId: number, vehicleId: number) {
    const user = await User.getUserById(userId);
    const vehicle = await Vehicle.getVehicleById(vehicleId);

    if (!vehicle) {
        throw new VehicleNotFoundError();
    }

    const userReservation = await Reservation.getUserReservation(user);
    if (!userReservation) {
        throw new InvalidReturnError("O usuário não possui nenhuma reserva.");
    }

    const vehicleReservation = await Reservation.getVehicleReservation(vehicle);
    if (!vehicleReservation) {
        throw new InvalidReturnError("O veículo não está reservado.");
    }

    const newReservation = await Reservation.returnVehicle(user, vehicle);
    return newReservation.getReservation();
}

async function getReservation(userId: number) {
    const user = await User.getUserById(userId);
    const userReservation = await Reservation.getUserReservation(user);
    return userReservation;
}

export { reserveVehicle, returnVehicle, getReservation };
