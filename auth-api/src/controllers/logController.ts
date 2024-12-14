import { RequestHandler } from "express";

import { Log } from "../models/Log";

export const list: RequestHandler = (req, res, next) => {
  Log.find()
    .populate("user")
    .exec()
    .then((logs) => res.json({ logs }))
    .catch(next);
};
