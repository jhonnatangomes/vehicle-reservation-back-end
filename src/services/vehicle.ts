import Vehicle from "../entities/Vehicle";

async function getVehicles() {
    const vehicles = await Vehicle.getVehicles();
    return vehicles;
}

export { getVehicles };
