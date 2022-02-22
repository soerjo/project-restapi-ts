import mongoose from 'mongoose';
import log from '../utils/log';

async function dbConnection(uri: string) {
  try {
    return await mongoose.connect(uri);
  } catch (e) {
    log.error(e, 'db not connected!');
    process.exit(1);
  }
}

export default dbConnection;
