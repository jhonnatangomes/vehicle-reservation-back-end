import ConflictError from "./ConflictError";

export default class InvalidReservationError extends ConflictError {
    constructor(message: string) {
        super(message);

        this.name = "InvalidReservationError";
    }
}
