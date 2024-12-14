import { Document, Schema, Model, model, SchemaTypes } from "mongoose";

export interface ILog extends Document {
  request: any;
  user: string;
  response: any;
  requestedAt: Date;
  respondedAt: Date;
}

const logSchema: Schema = new Schema({
  request: {
    type: SchemaTypes.Mixed,
    required: true,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  response: {
    type: SchemaTypes.Mixed,
    required: true,
  },
  requestedAt: {
    type: SchemaTypes.Date,
    required: true,
  },
  respondedAt: {
    type: SchemaTypes.Date,
    required: true,
  },
});

export const Log: Model<ILog> = model<ILog>("Log", logSchema);
