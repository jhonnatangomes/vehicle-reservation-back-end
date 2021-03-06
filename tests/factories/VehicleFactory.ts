import faker from "@faker-js/faker";
import Vehicle from "../../src/entities/Vehicle";

export default class VehicleFactory {
    static createVehicle() {
        const vehicle = Vehicle.create({
            name: faker.vehicle.model(),
            pricePerDay: Number(faker.commerce.price()),
        });
        return vehicle;
    }

    static async createVehicles(amount: number) {
        const vehicles: Vehicle[] = [];
        for (let i = 0; i < amount; i++) {
            vehicles.push(this.createVehicle());
        }
        await Vehicle.save(vehicles);
        return vehicles;
    }
}
