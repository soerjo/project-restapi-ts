import mongoose from 'mongoose';

export interface ISession {
  userId: string;
  statusIdle: boolean;
  date: Date;
}

type ISessionModel = ISession & mongoose.Document;

const SessionSchema = new mongoose.Schema<ISessionModel>({
  userId: { type: String, required: true },
  statusIdle: { type: Boolean, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<ISessionModel>('Session', SessionSchema);
