import { Router } from "express";

import v1Router from "./v1";
import v2Router from "./v2";

export default Router().use("/v1", v1Router).use("/v2", v2Router);
