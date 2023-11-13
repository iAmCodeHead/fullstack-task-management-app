import express, { Router } from 'express';
import docsRoute from './swagger.route';
import userRoute from './user.route';
import config from '../../config';
import authRoute from './auth.route';
import taskRoute from './task.route';
import Envs from '../../config/config.enum';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/task',
    route: taskRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === Envs.DEV) {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
