import UserModel from '../models/User.model';
import { DocumentDefinition } from 'mongoose';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import { ISavedUser } from '../models/User.model';
import log from '../utils/log';

class UserService {
  body: DocumentDefinition<Omit<ISavedUser, 'passConfirm'>>;
  params: Request['params'];

  constructor(req: Request) {
    this.body = req.body;
    this.params = req.params;
  }

  create = async () => {
    const dataUser: ISavedUser = this.body;
    const gensalt = await bcrypt.genSalt(10);
    const hashPswd = await bcrypt.hash(dataUser.password, gensalt);
    dataUser.password = hashPswd;

    try {
      const user = await UserModel.create({ ...dataUser, status: false });
      return {
        _id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        status: user.status,
      };
    } catch (error: unknown) {
      log.error(error);
      throw error;
    }
  };

  read = async () => {
    try {
      return await UserModel.find().select('_id userName userEmail status');
    } catch (error: unknown) {
      log.error(error);
      throw error;
    }
  };

  readById = async () => {
    const userId = this.params.id || null;
    try {
      return await UserModel.findOne({ _id: userId }).select('_id userName userEmail status');
    } catch (error: unknown) {
      log.error(error);
      throw error;
    }
  };

  search = async () => {
    const { parameter, search } = this.params;
    try {
      return await UserModel.findOne({ [parameter]: search }).select('_id userName userEmail status');
    } catch (error: unknown) {
      log.error(error);
      throw error;
    }
  };

  update = async () => {
    const userId = this.params.id;
    const userData = this.body;
    try {
      return await UserModel.findOneAndUpdate({ _id: userId }, { ...userData }, { new: true }).select(
        '_id userName userEmail status',
      );
    } catch (error: unknown) {
      throw error;
    }
  };

  delete = async () => {
    const userId = this.params.id;
    try {
      const res = await UserModel.deleteOne({ _id: userId });
      console.log(res);
      if (!res.deletedCount) return false;
      return res;
    } catch (error: unknown) {
      throw error;
    }
  };
}

export default UserService;
