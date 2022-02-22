import AuthController from '../controllers/Auth.controller';
import { validation } from '../middleware/validation.midlleware';
import BaseRoute, { IRouter } from './BaseRoute';
import { Methods } from './BaseRoute';
import { registSchema } from '../middleware/validation/auth.validation';

class AuthRoutes extends BaseRoute {
  path = '/auth';

  routes: IRouter[] = [
    {
      methods: Methods.POST,
      path: '/regist',
      middleware: [validation(registSchema)],
      handler: AuthController.regist,
    },
    {
      methods: Methods.POST,
      path: '/login',
      middleware: [],
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
  ];
}

export default AuthRoutes;
