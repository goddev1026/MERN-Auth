import { Document, Schema, Model, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

import { Message } from "../enums";

export interface IUser extends Document {
  email: string;
  password: string;
  roles: string[];
  comparePassword: (_: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, Message.InvalidEmail],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ["user"],
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", function () {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User: Model<IUser> = model<IUser>("User", userSchema);
