import NotFoundError from "./NotFoundError";

export default class InvalidReturnError extends NotFoundError {
    constructor(message: string) {
        super(message);

        this.name = "InvalidReturnError";
    }
}
