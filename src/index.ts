import App from './App';
import express from 'express';
import db from './config/dbConnection';
import { plugins } from './middleware';
import config from './config/default';
import routes from './routes';
import log from './utils/log';

const app = express();
const server = new App(app, config.port);

Promise.resolve()
  .then(() => server.plugins(plugins))
  .then(() => server.routes(routes))
  .then(() => db(config.dbUri))
  .then(() => server.run())
  .catch((err) => log.error(err));
