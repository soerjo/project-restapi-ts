import { Schema, model, Document } from 'mongoose';
import { IAuth } from '../interfaces/Auth.interface';

export type IAuthModel = IAuth & Document;

const AuthSchema = new Schema<IAuthModel>(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

export default model<IAuthModel>('Auth', AuthSchema);
