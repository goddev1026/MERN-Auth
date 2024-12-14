import { RequestHandler } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import StatusCode from "status-code-enum";

import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRATION_HOURS = process.env.JWT_EXPIRATION_HOURS || 1;

export const login: RequestHandler = (req, res, next) =>
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      next(err);
    } else if (info) {
      res.status(StatusCode.ClientErrorUnauthorized).json(info);
    } else {
      const accessToken = jwt.sign(
        { sub: user.id, isAdmin: user.roles.includes("super") },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRATION_HOURS + "h",
        }
      );
      res.json({ accessToken });
    }
  })(req, res, next);

export const register: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user
    .save()
    .then(() =>
      res.status(StatusCode.SuccessAccepted).json({ message: "Success" })
    )
    .catch(next);
};

export const forgotPassword: RequestHandler = (req, res, next) => {};

export const resetPassword: RequestHandler = (req, res, next) => {};
