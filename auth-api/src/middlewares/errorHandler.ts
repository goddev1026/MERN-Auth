import { ErrorRequestHandler, Request } from "express";
import { MongoServerError } from "mongodb";
import { Error as MongooseError } from "mongoose";
import { pick } from "lodash";
import StatusCode from "status-code-enum";

import { ErrorLog } from "../models/ErrorLog";
import { Message } from "../enums";

const logError: (req: Request, err: Error) => void = (req, err) => {
  const request = pick(req, "ip baseUrl headers params query body".split(" "));
  const error = pick(err, ["name", "message", "stack"]);
  new ErrorLog({ request, user: req.user, error })
    .save()
    .then(() => {})
    .catch(() => console.log("Error saving log."));
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof MongoServerError) {
    switch (err.code) {
      case 11000:
        return res
          .status(StatusCode.ClientErrorUnprocessableEntity)
          .json({ message: Message.DuplicateKeyError });
    }
  }

  if (err instanceof MongooseError.CastError) {
    return res
      .status(StatusCode.ClientErrorUnprocessableEntity)
      .json({ message: Message.InvalidId });
  }

  res
    .status(StatusCode.ServerErrorInternal)
    .json({ message: Message.InternalServerError });

  logError(req, err);
};
