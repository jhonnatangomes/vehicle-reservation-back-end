/* eslint-disable lines-between-class-members */
import faker from "@faker-js/faker";
import bcrypt from "bcrypt";
import User from "../../src/entities/User";
import getRandomElement from "../utils/getRandomElement";

export default class UserFactory {
    name: string;
    email: string;
    password: string;

    constructor() {
        this.name = faker.name.findName();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
    }

    async createUserInDb() {
        const hashedPassword = bcrypt.hashSync(this.password, 12);
        const user = await User.createUser(
            this.name,
            this.email,
            hashedPassword
        );
        return user;
    }

    getUser() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
        };
    }

    getIncorrectUser() {
        const randomNum = faker.datatype.number();
        const user = {
            name: this.name,
            email: this.email,
            password: this.password,
        };
        const incorrectOptions = [
            {
                ...user,
                name: randomNum,
            },
            {
                ...user,
                email: randomNum,
            },
            {
                ...user,
                password: randomNum,
            },
        ];
        return getRandomElement(incorrectOptions);
    }
}
