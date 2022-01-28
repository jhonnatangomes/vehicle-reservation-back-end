export default class InvalidDataError extends Error {
    details: string[];

    constructor(details: string[]) {
        super("Campos inválidos");

        this.details = details;
        this.name = "InvalidDataError";
    }
}
