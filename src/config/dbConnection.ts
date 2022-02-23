import mongoose from 'mongoose';
import log from '../utils/log';
import config from '../config/default';

const options = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 500, // Close sockets after 0.5 seconds of inactivity
};

export const db = mongoose.createConnection(config.dbUri, options);

async function dbConnection() {
  try {
    await mongoose.connect(config.dbUri, options);
    log.info('db connected!');
  } catch (e) {
    log.error(e, 'db not connected!');
    process.exit(1);
  }
}

export default dbConnection;
