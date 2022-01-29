import NotFoundError from "./NotFoundError";

export default class VehicleNotFoundError extends NotFoundError {
    constructor() {
        super("O veículo não existe.");

        this.name = "VehicleNotFoundError";
    }
}
