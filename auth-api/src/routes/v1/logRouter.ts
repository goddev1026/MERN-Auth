import { Router } from "express";

import { list } from "../../controllers/logController";
import { authorizeJWT } from "../../middlewares";

export default Router().get("/", authorizeJWT, list);
