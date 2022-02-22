import { NextFunction, Request, Response, Router } from 'express';
import { Schema } from 'joi';

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

type Validation = (
  schema: Schema,
) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
type Middleware = (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
type Handler = (
  eq: Request,
  res: Response,
  next: NextFunction,
) => void | Promise<void> | Promise<Response<any, Record<string, any>> | undefined>;

export interface IRouter {
  path: string;
  methods: Methods;
  middleware: Array<Validation | Middleware>;
  handler: Handler;
}

abstract class BaseRoute {
  abstract path: string;
  abstract routes: Array<IRouter>;
  protected router: Router = Router();

  setRoutes(): Router {
    this.routes.forEach((route) => {
      this.router[route.methods](`${this.path}${route.path}`, route.middleware, route.handler);
    });
    return this.router;
  }
}

export default BaseRoute;
