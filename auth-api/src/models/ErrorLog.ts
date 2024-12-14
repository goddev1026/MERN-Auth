import { Document, Schema, Model, model, SchemaTypes } from "mongoose";

export interface IErrorLog extends Document {
  request: any;
  user: string;
  error: any;
}

const errorLogSchema: Schema = new Schema(
  {
    request: {
      type: SchemaTypes.Mixed,
      required: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    error: {
      type: SchemaTypes.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export const ErrorLog: Model<IErrorLog> = model<IErrorLog>(
  "Error",
  errorLogSchema
);
