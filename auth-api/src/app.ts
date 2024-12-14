import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";

import strategies from "./passportStrategies";
import apiRouter from "./routes";
import { logger, errorHandler } from "./middlewares";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(passport.initialize());
passport.use("local", strategies.local);
passport.use("jwt", strategies.jwt);

app.use(logger);

app.use("/api", apiRouter);

app.use(errorHandler);

export default app;
