import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";
import errorMiddleware from "./middlewares/errorMiddleware";
import router from "./routers/index";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
app.use(errorMiddleware);

export async function init() {
    await connectDatabase();
}

export default app;
