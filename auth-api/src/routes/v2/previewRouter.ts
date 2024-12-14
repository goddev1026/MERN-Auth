import { Router } from "express";

import { authorizeJWT } from "../../middlewares";
import { list, retrieve } from "../../controllers/previewController";

export default Router()
  .post("/", authorizeJWT, list)
  .post("/:url", authorizeJWT, retrieve)
  .get("/", list)
  .get("/:url", retrieve);
