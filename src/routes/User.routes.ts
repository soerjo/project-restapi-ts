import UserController from '../controllers/User.controller';
import { updateUserSchema, createUserSchema, getUserbyIdSchema } from '../middleware/validation/UserRoute.validation';
import { validation } from '../middleware/validation.midlleware';
import BaseRoute, { IRoutes } from './BaseRoute';
import { Methods } from './BaseRoute';
// import { Authorization } from '../middleware/Authorization.middleware';

class UserRoutes extends BaseRoute {
  path = '/user';

  routes: IRoutes[] = [
    {
      methods: Methods.GET,
      path: '/:id',
      middleware: [validation(getUserbyIdSchema)],
      handler: UserController.index,
    },
    {
      methods: Methods.POST,
      path: '/',
      middleware: [validation(createUserSchema)],
      handler: UserController.create,
    },
    {
      methods: Methods.PUT,
      path: '/:id',
      middleware: [validation(updateUserSchema)],
      handler: UserController.update,
    },
    {
      methods: Methods.DELETE,
      path: '/:id',
      middleware: [validation(getUserbyIdSchema)],
      handler: UserController.delete,
    },
    {
      methods: Methods.GET,
      path: '/',
      middleware: [],
      handler: UserController.show,
    },
  ];
}

export default UserRoutes;
