import { Document, Schema, Model, model } from "mongoose";

export interface IRole extends Document {
  title: any;
  roles: string[];
}

const roleSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  roles: {
    type: [String],
  },
});

export const Role: Model<IRole> = model<IRole>("Role", roleSchema);
