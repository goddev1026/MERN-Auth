import { Document, Schema, Model, model, SchemaTypes } from "mongoose";

export interface IMetadata extends Document {
  url: string;
  metadata: any;
}

const metadataSchema: Schema = new Schema({
  url: {
    type: SchemaTypes.String,
    required: true,
  },
  metadata: {
    type: SchemaTypes.Mixed,
    required: true,
  },
});

export const Metadata: Model<IMetadata> = model<IMetadata>(
  "Metadata",
  metadataSchema
);
