import { Router } from "express";

import authRouter from "./authRouter";
import userRouter from "./userRouter";
import logRouter from "./logRouter";

export default Router()
  .use("/auth", authRouter)
  .use("/user", userRouter)
  .use("/log", logRouter);
