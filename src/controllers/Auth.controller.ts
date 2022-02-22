import { Request, Response } from "express";

class AuthController {
  static regist = async (req: Request, res: Response) => {
    return res.status(200).send({
      msg: "route regist",
      body: req.body,
    });
  };
  static login = async (req: Request, res: Response) => {
    return res.status(200).send({
      msg: "route login",
      body: req.body,
    });
  };
  static confirm = async (req: Request, res: Response) => {
    return res.status(200).send({
      msg: "route confirm",
      body: req.body,
      params: req.params,
    });
  };
  static forgot = async (req: Request, res: Response) => {
    return res.status(200).send({
      msg: "route forgot",
      body: req.body,
    });
  };
}

export default AuthController;
