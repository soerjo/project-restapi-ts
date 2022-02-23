import { NextFunction, Request, Response } from 'express';
import UserService from '../services/User.service';
import log from '../utils/log';

class UserController {
  static index = async (req: Request, res: Response) => {
    const user = new UserService(req);

    try {
      const resReadDbbyId = await user.readById();
      res.status(200).json(resReadDbbyId);
    } catch (error) {
      res.status(400).json({ msg: 'some thing error', error });
    }
  };

  static show = async (req: Request, res: Response) => {
    const user = new UserService(req);

    try {
      const resReadDbAll = await user.read();
      res.status(200).json(resReadDbAll);
    } catch (error) {
      res.status(400).json({ msg: 'some thing error', error });
    }
  };

  static create = async (req: Request, res: Response) => {
    const user = new UserService(req);

    try {
      const resCreateDb = await user.create();
      res.status(200).json({ msg: 'success save data!', data: { resCreateDb } });
    } catch (error) {
      res.status(400).json({ msg: 'canot save data!', error });
    }
  };

  static update = async (req: Request, res: Response) => {
    const user = new UserService(req);

    try {
      const resUpdateDb = await user.update();
      res.status(200).json(resUpdateDb);
    } catch (error) {
      res.status(400).json({ msg: 'some thing error', error });
    }
  };

  static delete = async (req: Request, res: Response, next: NextFunction) => {
    const user = new UserService(req);

    try {
      const resDeleteDb = await user.delete();
      if (resDeleteDb) return res.status(200).json(resDeleteDb);
      res.status(404).json({ msg: 'failed delete data' });
    } catch (error: any) {
      next(new Error(error.message));
    }
  };
}

export default UserController;
