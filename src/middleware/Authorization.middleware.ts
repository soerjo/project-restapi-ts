import { NextFunction, Request, Response } from 'express';
import TokenGenerator from '../utils/TokenGenerator';
import SessionModel from '../models/Session.model';
import log from '../utils/log';

export const Authorization = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];
  if (!authorization) return res.status(400).json({ msg: 'need Token Authorization, please login' });
  const token = authorization.split(' ')[1];

  //decode & verify token
  const decode = await TokenGenerator.decodeToken(token);
  if (!decode) return res.status(400).json({ msg: 'token is not valid or expire, please login' });

  //find session
  const userId = decode.userId;
  const findSession = await SessionModel.findOne({ userId });
  if (!findSession) return res.status(401).json({ msg: 'plase login' });

  res.locals.decode = decode;
  return next();
};
