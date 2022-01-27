import supertest from "supertest";
import app, { init } from "../../src/app";
import UserFactory from "../factories/UserFactory";
import deleteTables from "../utils/deleteTables";

const agent = supertest(app);

beforeAll(async () => {
    await init();
    await deleteTables();
});

describe("post /sign-up", () => {
    const user = new UserFactory();
    it("returns 400 when invalid data is sent", async () => {
        const result = await agent
            .post("/sign-up")
            .send(user.getIncorrectUser());
        expect(result.status).toEqual(400);
    });

    it("returns 201 when succesfully registering a user", async () => {
        const result = await agent.post("/sign-up").send(user.getUser());
        expect(result.status).toEqual(201);
    });

    it("returns 409 when trying to register an already registered user", async () => {
        const result = await agent.post("/sign-up").send(user.getUser());
        expect(result.status).toEqual(409);
    });
});

describe("post /sign-in", () => {
    const user = new UserFactory();

    beforeAll(async () => {
        await user.createUserInDb();
    });

    it("returns 400 when invalid data is sent", async () => {
        const result = await agent
            .post("/sign-in")
            .send(user.getIncorrectLoginUser());
        expect(result.status).toEqual(400);
    });

    it("returns 404 when an incorrect email or password is given", async () => {
        const result = await agent
            .post("/sign-in")
            .send(user.getUserWithIncorrectCredentials());
        expect(result.status).toEqual(404);
    });

    it("returns 200 and a token when user succesfully logins", async () => {
        const login = user.getUser();
        const result = await agent.post("/sign-in").send({
            email: login.email,
            password: login.password,
        });
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty("token");
    });
});
