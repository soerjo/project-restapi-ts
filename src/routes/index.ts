import { Router } from 'express';
import UserRoutes from './User.routes';
import AuthRoutes from './Auth.routes';

const routes: Router[] = [new UserRoutes().setRoutes(), new AuthRoutes().setRoutes()];

export default routes;
