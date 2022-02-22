import AuthController from '../controllers/Auth.controller';
import { validation } from '../middleware/validation.midlleware';
import BaseRoute, { IRoutes } from './BaseRoute';
import { Methods } from './BaseRoute';
import { loginSchema, registSchema } from '../middleware/validation/auth.validation';
import { Authorization } from '../middleware/Authorization.middleware';

class AuthRoutes extends BaseRoute {
  protected path = '/auth';

  routes: IRoutes[] = [
    {
      methods: Methods.POST,
      path: '/regist',
      middleware: [validation(registSchema)],
      handler: AuthController.regist,
    },
    {
      methods: Methods.POST,
      path: '/login',
      middleware: [validation(loginSchema)],
      handler: AuthController.login,
    },
    {
      methods: Methods.POST,
      path: '/forgot',
      middleware: [],
      handler: AuthController.forgot,
    },
    {
      methods: Methods.GET,
      path: '/:userId/:token',
      middleware: [],
      handler: AuthController.confirm,
    },
    {
      methods: Methods.DELETE,
      path: '/logout',
      middleware: [Authorization],
      handler: AuthController.logout,
    },
  ];
}

export default AuthRoutes;
