import http from 'http';
import { Application, RequestHandler, Router } from 'express';
import ErrorMiddleware from './middleware/Error.middleware';
import log from './utils/log';

class App {
  private app: Application;
  private port: number;

  constructor(app: Application, port: number) {
    this.app = app;
    this.port = port;
  }

  public plugins(plugins: RequestHandler[]) {
    plugins.forEach((plugin) => {
      this.app.use(plugin);
    });
  }

  public routes(routes: Router[]) {
    this.app.get('/', (req, res) => res.status(200).json('connection ok!'));
    routes.forEach((route) => {
      this.app.use('/api', route);
    });
    this.app.use(ErrorMiddleware);
  }

  public run(): http.Server {
    return this.app.listen(this.port, async () => {
      log.info(`app running at http://localhost:${this.port}`);
    });
  }
}

export default App;
