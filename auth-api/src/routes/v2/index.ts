import { Router } from "express";

import authRouter from "../v1/authRouter";
import userRouter from "../v1/userRouter";
import logRouter from "../v1/logRouter";
import previewRouter from "./previewRouter";

export default Router()
  .use("/auth", authRouter)
  .use("/user", userRouter)
  .use("/log", logRouter)
  .use("/linkpreview", previewRouter);
