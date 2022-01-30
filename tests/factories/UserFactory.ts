/* eslint-disable lines-between-class-members */
import faker from "@faker-js/faker";
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
        const user = await User.createUser(
            this.name,
            this.email,
            this.password
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

    getLoginUser() {
        return {
            email: this.email,
            password: this.password,
        };
    }

    getIncorrectUser() {
        const randomNum = faker.datatype.number();
        const user = this.getUser();
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

    getIncorrectLoginUser() {
        const randomNum = faker.datatype.number();
        const user = this.getLoginUser();
        const incorrectOptions = [
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

    getUserWithIncorrectCredentials() {
        const incorrectCredentials = faker.datatype.string();
        const user = this.getLoginUser();
        const incorrectOptions = [
            {
                ...user,
                email: incorrectCredentials,
            },
            {
                ...user,
                password: incorrectCredentials,
            },
        ];
        return getRandomElement(incorrectOptions);
    }
}
