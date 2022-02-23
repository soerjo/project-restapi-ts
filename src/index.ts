import App from './App';
import dbConnection from './config/dbConnection';
import config from './config/default';
import log from './utils/log';

const server = new App();
Promise.resolve()
  .then(async () => {
    await dbConnection();
    server.run(config.port);
  })
  .catch((err) => {
    log.error(err);
    process.exit(1);
  });
