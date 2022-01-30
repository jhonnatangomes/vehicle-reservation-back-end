import supertest from "supertest";
import app, { init } from "../../src/app";
import deleteTables from "../utils/deleteTables";
import endConnection from "../utils/endConnection";

import VehicleFactory from "../factories/VehicleFactory";
import ImageFactory from "../factories/ImageFactory";
import SessionFactory from "../factories/SessionFactory";

const agent = supertest(app);

beforeAll(async () => {
    await init();
    await deleteTables();
});

afterAll(async () => {
    await endConnection();
});

describe("get /vehicles", () => {
    it("returns 200 and a list of vehicles", async () => {
        const vehicles = await VehicleFactory.createVehicles(5);
        await ImageFactory.createImages(vehicles);
        const session = await SessionFactory.createSession();

        const result = await agent
            .get("/vehicles")
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(200);
        expect(result.body[0]).toHaveProperty("id");
        expect(result.body[0]).toHaveProperty("name");
        expect(result.body[0]).toHaveProperty("pricePerDay");
        expect(result.body[0]).toHaveProperty("images");
        expect(result.body[0].images[0]).toHaveProperty("id");
        expect(result.body[0].images[0]).toHaveProperty("url");
        expect(result.body[0].images[0]).toHaveProperty("color");
    });
});
