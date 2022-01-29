import Reservation from "../entities/Reservation";
import User from "../entities/User";
import Vehicle from "../entities/Vehicle";
import InvalidReservationError from "../errors/InvalidReservationError";
import VehicleNotFoundError from "../errors/VehicleNotFoundError";

async function reserveVehicle(userId: number, vehicleId: number) {
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

    const newReservation = await Reservation.createReservation(user, vehicle);
    return newReservation.getReservation();
}

export { reserveVehicle };
