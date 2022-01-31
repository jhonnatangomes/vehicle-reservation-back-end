import supertest from "supertest";
import app, { init } from "../../src/app";
import ImageFactory from "../factories/ImageFactory";
import ReservationFactory from "../factories/ReservationFactory";
import SessionFactory from "../factories/SessionFactory";
import VehicleFactory from "../factories/VehicleFactory";
import { Reservation } from "../protocols/Reservation";
import { Session } from "../protocols/Session";
import { Vehicle } from "../protocols/Vehicle";
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

    it("returns 200 and creates a reservation", async () => {
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
        expect(result.body).toHaveProperty("id");
        expect(result.body).toHaveProperty("name");
        expect(result.body).toHaveProperty("pricePerDay");
        expect(result.body).toHaveProperty("reservations");
        expect(result.body).toHaveProperty("images");
    });
});

describe("post /reservation/return", () => {
    let session: Session;
    let vehicle: Vehicle;
    let reservation: Reservation;

    beforeAll(async () => {
        await deleteTables();
        session = await SessionFactory.createSession();
        vehicle = (await VehicleFactory.createVehicles(1))[0];
    });

    it("returns 400 for incorrect body sent", async () => {
        const body = ReservationFactory.getWrongReturnBody();
        const result = await agent
            .post("/reservation/return")
            .send(body)
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(400);
    });

    it("returns 404 for non-existent vehicle", async () => {
        const result = await agent
            .post("/reservation/return")
            .send({
                vehicleId: vehicle.id + 100,
            })
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(404);
        expect(JSON.parse(result.text)).toEqual({
            message: "O veículo não existe.",
        });
    });

    it("returns 404 when user doesn't have a reservation", async () => {
        const result = await agent
            .post("/reservation/return")
            .send({
                vehicleId: vehicle.id,
            })
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(404);
        expect(JSON.parse(result.text)).toEqual({
            message: "O usuário não possui nenhuma reserva.",
        });
    });

    it("returns 404 when car isn't reserved", async () => {
        reservation = await ReservationFactory.createPreviousReservation(
            session.user.id
        );
        const result = await agent
            .post("/reservation/return")
            .send({
                vehicleId: vehicle.id,
            })
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(404);
        expect(JSON.parse(result.text)).toEqual({
            message: "O veículo não está reservado.",
        });
    });

    it("returns 200 and returns the reservation", async () => {
        const result = await agent
            .post("/reservation/return")
            .send({
                vehicleId: reservation.vehicle.id,
            })
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(200);
        expect(result.body.returnDate).not.toEqual(null);
    });
});

describe("get /reservation", () => {
    let session: Session;

    beforeAll(async () => {
        await deleteTables();
        session = await SessionFactory.createSession();
    });

    it("returns 200 and an empty response when there are no reservations open", async () => {
        const result = await agent
            .get("/reservation")
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual({});
    });

    it("returns 200 and an open reservation", async () => {
        await ReservationFactory.createPreviousReservation(session.user.id);
        const result = await agent
            .get("/reservation")
            .set("Authorization", `Bearer ${session.token}`);
        expect(result.status).toEqual(200);
        expect(result.body.returnDate).toEqual(null);
    });
});
