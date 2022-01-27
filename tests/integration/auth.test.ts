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
