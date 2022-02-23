import App from './App';
import config from './config/default';
import log from './utils/log';

const server = new App();

Promise.resolve()
  .then(() => server.run(config.port))
  .catch((err) => {
    log.error(err);
    process.exit(1);
  });
