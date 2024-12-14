import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import StatusCode from "status-code-enum";

export const checkValidationResult: RequestHandler = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const { msg: message } = result.array()[0];
    res.status(StatusCode.ClientErrorUnprocessableEntity).json({ message });
  } else {
    next();
  }
};
