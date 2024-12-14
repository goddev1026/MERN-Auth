import { Router } from "express";
import { check } from "express-validator";

import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from "../../controllers/authController";
import { checkValidationResult } from "../../middlewares";
import { Message } from "../../enums";

export default Router()
  .post(
    "/login",
    [
      check("email", Message.EmailRequired).notEmpty(),
      check("email", Message.InvalidEmail).isEmail(),
      check("password", Message.PasswordRequired).notEmpty(),
    ],
    checkValidationResult,
    login
  )
  .post(
    "/register",
    [
      check("email", Message.EmailRequired).notEmpty(),
      check("email", Message.InvalidEmail).isEmail(),
      check("password", Message.PasswordRequired).notEmpty(),
      check("password", Message.ShortPassword).isLength({ min: 8 }),
      check("confirmationPassword", Message.ConfirmPasswordRequired).notEmpty(),
      check("password", Message.PasswordsNotMatch).custom(
        (password, { req }) => password === req.body.confirmationPassword
      ),
    ],
    checkValidationResult,
    register
  )
  .post("/forgot-password", forgotPassword)
  .post("/reset-password", resetPassword);
