import { Response, Request, NextFunction } from "express";
import { HttpException } from "../interfaces/HttpException.interface";

export default function (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "something went wrong";
  return res.status(status).send({ status, message });
}
