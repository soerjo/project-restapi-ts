import jwt from 'jsonwebtoken';
import config from '../config/default';
import log from './log';

export interface IPayload {
  userId: string;
  statusIdle: boolean;
}

class TokenGenerator {
  static generateToken = async (payload: IPayload, expiresIn: string | number = '30s') => {
    return jwt.sign(payload, config.jwtSecret, { expiresIn });
  };
  static decodeToken = async (token: string) => {
    try {
      const payload = jwt.verify(token, config.jwtSecret) as jwt.JwtPayload;
      return { ...payload };
    } catch (error: unknown) {
      return false;
    }
  };
}

export default TokenGenerator;
