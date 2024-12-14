import { RequestHandler, Response } from "express";
import { pick } from "lodash";

import { Log } from "../models/Log";

export const logger: RequestHandler = (req, res, next) => {
  next();

  const requestedAt = new Date();

  res.on("finish", function (this: Response) {
    const request = pick(
      req,
      "ip baseUrl headers params query body".split(" ")
    );
    const response = pick(this, ["statusCode"]);
    const respondedAt = new Date();
    new Log({ request, user: req.user, response, requestedAt, respondedAt })
      .save()
      .then(() => {})
      .catch(() => console.log("Error saving log."));
  });
};
