import supertest from "supertest";
import app, { init } from "../../src/app";
import ImageFactory from "../factories/ImageFactory";
import ReservationFactory from "../factories/ReservationFactory";
import SessionFactory from "../factories/SessionFactory";
import VehicleFactory from "../factories/VehicleFactory";
import { Session } from "../protocols/Session";
import deleteTables from "../utils/deleteTables";
import endConnection from "../utils/endConnection";

const agent = supertest(app);

beforeAll(async () => {
    await init();
    await deleteTables();
});

afterAll(async () => {
    await endConnection();
});

describe("post /reservation", () => {
    let session: Session;

    beforeEach(async () => {
        await deleteTables();
        session = await SessionFactory.createSession();
    });

    it("returns 400 for wrong body sent", async () => {
        const body = ReservationFactory.getWrongReservationBody();
        const result = await agent
            .post("/reservation")
            .send(body)
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(400);
    });

    it("returns 404 for non-existent vehicle", async () => {
        const result = await agent
            .post("/reservation")
            .send({
                vehicleId: 1,
                daysRented: 1,
            })
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(404);
    });

    it("returns 409 when user already has a previous reservation", async () => {
        const reservation = await ReservationFactory.createPreviousReservation(
            session.user.id
        );
        const result = await agent
            .post("/reservation")
            .send({
                vehicleId: reservation.vehicle.id,
                daysRented: 1,
            })
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(409);
        expect(JSON.parse(result.text)).toEqual({
            message: "O usuário já possui uma reserva.",
        });
    });

    it("returns 409 when vehicle is already reserved", async () => {
        const reservation =
            await ReservationFactory.createPreviousReservation();
        const result = await agent
            .post("/reservation")
            .send({
                vehicleId: reservation.vehicle.id,
                daysRented: 1,
            })
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(409);
        expect(JSON.parse(result.text)).toEqual({
            message: "O veículo já está reservado.",
        });
    });

    it("returns 200 and returns a reservation", async () => {
        const vehicle = await VehicleFactory.createVehicles(1);
        await ImageFactory.createImages(vehicle);
        const result = await agent
            .post("/reservation")
            .send({
                vehicleId: vehicle[0].id,
                daysRented: 1,
            })
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty("vehicle");
        expect(result.body).toHaveProperty("createdAt");
        expect(result.body).toHaveProperty("returnDate");
        expect(result.body).toHaveProperty("totalToPay");
        expect(result.body).toHaveProperty("daysRented");
        expect(result.body).toHaveProperty("isDelayed");
        expect(result.body).toHaveProperty("totalDelayFee");
        expect(result.body.vehicle).toHaveProperty("id");
        expect(result.body.vehicle).toHaveProperty("name");
        expect(result.body.vehicle).toHaveProperty("images");
        expect(result.body.vehicle).toHaveProperty("pricePerDay");
        expect(result.body.vehicle.images[0]).toHaveProperty("id");
        expect(result.body.vehicle.images[0]).toHaveProperty("url");
        expect(result.body.vehicle.images[0]).toHaveProperty("color");
    });
});
