import ConflictError from "./ConflictError";

export default class AlreadyExistingUserError extends ConflictError {
    constructor() {
        super("Email already registered.");

        this.name = "AlreadyExistingUserError";
    }
}
