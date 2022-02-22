import { Request, Response } from 'express';
import AuthService from '../services/Auth.service';
import log from '../utils/log';

class AuthController {
  static regist = async (req: Request, res: Response) => {
    const createAuth = await new AuthService(req).create();
    //panggil nodemailer

    return res.status(200).send({
      msg: 'route regist',
      body: createAuth,
    });
  };

  static login = async (req: Request, res: Response) => {
    const loginAuth = await new AuthService(req).login();
    if (!loginAuth) return res.status(400).json({ msg: 'password or email wrong!' });
    return res.status(200).send({
      msg: 'route login',
      data: loginAuth,
    });
  };

  static confirm = async (req: Request, res: Response) => {
    //get token from params
    //confirm token and check AuthDB

    return res.status(200).send({
      msg: 'route confirm',
      body: req.body,
      params: req.params,
    });
  };

  static forgot = async (req: Request, res: Response) => {
    return res.status(200).send({
      msg: 'route forgot',
      body: req.body,
    });
  };

  static logout = async (req: Request, res: Response) => {
    const { userId } = res.locals.decode;
    const resLogout = await new AuthService(req).delete(userId);
    if (resLogout) {
      return res.status(200).send({
        msg: 'success logout',
      });
    }
    return res.status(404).send({
      msg: 'failed logout',
    });
  };
}

export default AuthController;
