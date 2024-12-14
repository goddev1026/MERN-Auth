import { RequestHandler } from "express";
import { omit } from "lodash";
import StatusCode from "status-code-enum";

import { User } from "../models/User";
import { Message } from "../enums";

export const retrieve: RequestHandler = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.json({ id: user.id, email: user.email });
      } else {
        res
          .status(StatusCode.ClientErrorNotFound)
          .json({ message: Message.UserNotFound });
      }
    })
    .catch(next);
};

export const list: RequestHandler = (req, res, next) => {
  User.find()
    .then((users) =>
      res.json({
        users: users.map((user) => ({ id: user.id, email: user.email })),
      })
    )
    .catch(next);
};

export const create: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user
    .save()
    .then(() =>
      res.status(StatusCode.SuccessCreated).json({ message: Message.Success })
    )
    .catch(next);
};

export const update: RequestHandler = (req, res, next) => {
  const { id } = req.params;

  const data = { ...req.body };
  omit(data, ["id", "_id", "email", "password", "role"]);

  User.findByIdAndUpdate(id, data)
    .then((user) => {
      if (user) {
        res.json({ message: Message.SuccessfullyUpdated });
      } else {
        res
          .status(StatusCode.ClientErrorNotFound)
          .json({ message: Message.UserNotFound });
      }
    })
    .catch(next);
};

export const remove: RequestHandler = (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then((user) => {
      if (user) {
        res.json({ message: Message.SuccessfullyRemoved });
      } else {
        res
          .status(StatusCode.ClientErrorNotFound)
          .json({ message: Message.UserNotFound });
      }
    })
    .catch(next);
};
