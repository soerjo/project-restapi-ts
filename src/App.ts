import http from 'http';
import express, { RequestHandler, Router } from 'express';
import { plugins } from './middleware';
import routes from './routes';
import ErrorMiddleware from './middleware/Error.middleware';
import log from './utils/log';

class App {
  app = express();

  constructor() {
    log.info('building server!');
    this.plugins(plugins);
    this.routes(routes);
  }

  plugins(plugins: RequestHandler[]) {
    plugins.forEach((plugin) => {
      this.app.use(plugin);
    });
  }

  routes(routes: Router[]) {
    this.app.get('/', (req, res) => res.status(200).json('connection ok!'));
    routes.forEach((route) => {
      this.app.use('/api', route);
    });
    this.app.use(ErrorMiddleware);
  }

  run(port: number): http.Server {
    return this.app.listen(port, async () => {
      log.info(`app running at http://localhost:${port}`);
    });
  }
}

export default App;
