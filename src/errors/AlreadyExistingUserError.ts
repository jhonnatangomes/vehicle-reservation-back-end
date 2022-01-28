import ConflictError from "./ConflictError";

export default class AlreadyExistingUserError extends ConflictError {
    constructor() {
        super("Email já registrado.");

        this.name = "AlreadyExistingUserError";
    }
}
