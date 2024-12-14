import { request, RequestHandler } from "express";
import { pick } from "lodash";
import StatusCode from "status-code-enum";
import urlMetadata from "url-metadata";

import { Metadata } from "../models/Metadata";
import { Log } from "../models/Log";

export const list: RequestHandler = async (req, res, next) => {
  try {
    const result = await Metadata.find();
    const data: any[] = [];
    for (const { id, url, metadata } of result) {
      const requests = await Log.find({ "request.params.url": url })
        .populate("user")
        .exec();
      data.push({
        id,
        url,
        metadata,
        requests: requests.map((request) =>
          pick(request, ["user.email", "requestedAt", "respondedAt"])
        ),
      });
    }
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

export const retrieve: RequestHandler = async (req, res, next) => {
  const { url } = req.params;
  try {
    const result = await Metadata.findOne({ url });
    if (!result) {
      const metadata = await urlMetadata(url as string);
      await new Metadata({ url, metadata }).save();
      res.json({ metadata });
    } else {
      res.json({ metadata: result.metadata });
    }
  } catch (err) {
    res
      .status(StatusCode.ClientErrorNotFound)
      .json({ message: "Url not found." });
  }
};
