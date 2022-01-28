import NotFoundError from "./NotFoundError";

export default class InvalidLoginError extends NotFoundError {
    constructor() {
        super("Email e/ou senha inválidos.");
        this.name = "InvalidLoginError";
    }
}
