import { Router } from "express";
import { check } from "express-validator";

import {
  retrieve,
  list,
  create,
  update,
  remove,
} from "../../controllers/userController";
import { authorizeJWT, checkValidationResult } from "../../middlewares";
import { Message } from "../../enums";

export default Router()
  .get("/", authorizeJWT, list)
  .get("/:id", authorizeJWT, retrieve)
  .post(
    "/",
    authorizeJWT,
    [
      check("email", Message.EmailRequired).notEmpty(),
      check("email", Message.InvalidEmail).isEmail(),
      check("password", Message.PasswordRequired).notEmpty(),
      check("password", Message.ShortPassword).isLength({ min: 8 }),
    ],
    checkValidationResult,
    create
  )
  .put("/:id", authorizeJWT, update)
  .delete("/:id", authorizeJWT, remove);
