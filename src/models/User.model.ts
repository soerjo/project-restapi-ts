import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";

export interface ISavedUser extends IUser {
  status: boolean;
}

export type IUserModel = ISavedUser & mongoose.Document;

const userSchema = new mongoose.Schema<IUserModel>(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { types: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserModel>("User", userSchema);
