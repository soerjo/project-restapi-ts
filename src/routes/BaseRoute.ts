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
type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void | Response<any, Record<string, any>> | Promise<void | Response<any, Record<string, any>>>;
type Handler = (
  eq: Request,
  res: Response,
  next: NextFunction,
) => void | Promise<void | Response<any, Record<string, any>> | undefined>;

export interface IRoutes {
  path: string;
  methods: Methods;
  middleware: Array<Validation | Middleware>;
  handler: Handler;
}

abstract class BaseRoute {
  protected abstract path: string;
  abstract routes: Array<IRoutes>;
  protected gateMiddleware: Middleware | undefined;
  protected router: Router = Router();

  setRoutes(): Router {
    if (this.gateMiddleware) {
      this.router.use(`${this.path}`, this.gateMiddleware);
    }
    this.routes.forEach((route) => {
      this.router[route.methods](`${this.path}${route.path}`, route.middleware, route.handler);
    });
    return this.router;
  }
}

export default BaseRoute;
