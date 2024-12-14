import { RequestHandler } from "express";
import passport from "passport";
import StatusCode from "status-code-enum";

import { Role } from "../models/Role";
import { formatMessage } from "../helpers/message";
import { Message } from "../enums/Message";

export const authenticateJWT: RequestHandler = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      next(err);
    } else if (info) {
      res
        .status(StatusCode.ClientErrorUnauthorized)
        .json({ message: formatMessage(info.message) });
    } else if (!user) {
      res
        .status(StatusCode.ClientErrorUnauthorized)
        .json({ message: Message.InvalidToken });
    } else {
      req.user = user.id;
      next();
    }
  })(req, res, next);
};

export const authorizeJWT: RequestHandler = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      next(err);
    } else if (info) {
      res
        .status(StatusCode.ClientErrorUnauthorized)
        .json({ message: formatMessage(info.message) });
    } else if (!user) {
      res
        .status(StatusCode.ClientErrorUnauthorized)
        .json({ message: Message.InvalidToken });
    } else {
      Role.find({ $or: user.roles.map((title: string) => ({ title })) })
        .then((data) => {
          console.log(data.map(({ roles }) => roles).flat());
          if (
            !data
              .map(({ roles }) => roles)
              .flat()
              .includes(req.baseUrl.split("/")[3])
          ) {
            throw new Error();
          }
          req.user = user.id;
          next();
        })
        .catch(() =>
          res
            .status(StatusCode.ClientErrorUnauthorized)
            .json({ message: Message.NoPermission })
        );
    }
  })(req, res, next);
};
