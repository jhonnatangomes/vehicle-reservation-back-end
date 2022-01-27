import NotFoundError from "./NotFoundError";

export default class InvalidLoginError extends NotFoundError {
    constructor() {
        super("email and/or password invalid");
        this.name = "InvalidLoginError";
    }
}
