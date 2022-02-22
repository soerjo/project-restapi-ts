import { DocumentDefinition } from 'mongoose';
import Encryption from '../utils/Encryption';
import { Request } from 'express';
import log from '../utils/log';
import { IAuth } from '../interfaces/Auth.interface';
import AuthModel from '../models/Auth.model';
import SessionModel from '../models/Session.model';
import TokenGenerator from '../utils/TokenGenerator';

class AuthService {
  protected body: DocumentDefinition<IAuth>;
  protected params: Request['params'];

  constructor(req: Request) {
    this.body = req.body;
    this.params = req.params;
  }

  create = async () => {
    const dataUser: IAuth = this.body;
    dataUser.password = await Encryption.GeneratePassword(dataUser.password);
    dataUser.status = false;

    try {
      const AuthDb = await AuthModel.create(dataUser);
      return {
        _id: AuthDb._id,
        userName: AuthDb.userName,
        userEmail: AuthDb.userEmail,
        status: AuthDb.status,
      };
    } catch (error: unknown) {
      log.error(error);
      throw error;
    }
  };

  read = async () => {
    try {
      return await AuthModel.find().select('_id userName userEmail status');
    } catch (error: unknown) {
      log.error(error);
      throw error;
    }
  };

  readById = async () => {
    const userId = this.params.id;
    try {
      return await AuthModel.findOne({ _id: userId }).select('_id userName userEmail status');
    } catch (error: unknown) {
      log.error(error);
      throw error;
    }
  };

  login = async () => {
    const { userEmail, password } = this.body;
    try {
      //find User
      const userData = await AuthModel.findOne({ userEmail });
      if (!userData) return false;

      //compare password
      const resCompare = await Encryption.ComparePassword(password, userData.password);
      if (!resCompare) return false;

      //save Session
      const payload = { userId: userData._id, statusIdle: true, date: Date.now() };
      await SessionModel.findOneAndUpdate(
        { userId: userData._id },
        { ...payload },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );

      //generate Token
      const getToken = await TokenGenerator.generateToken(payload, '60s');
      return {
        token: getToken,
        payload,
      };
    } catch (error: unknown) {
      log.error(error);
      throw error;
    }
  };

  update = async () => {
    const userId = this.params.id;
    const userData = this.body;
    try {
      return await AuthModel.findOneAndUpdate({ _id: userId }, { ...userData }, { new: true }).select(
        '_id userName userEmail status',
      );
    } catch (error: unknown) {
      throw error;
    }
  };

  delete = async (userId: string) => {
    try {
      const res = await SessionModel.deleteOne({ userId });
      console.log(res);
      if (!res.deletedCount) return false;
      return true;
    } catch (error: unknown) {
      throw error;
    }
  };
}

export default AuthService;
