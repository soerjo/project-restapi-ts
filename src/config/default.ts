require("dotenv").config();

//SERVER DEFAULT
const SERVER_HOSTNAME: string = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT: number = Number(process.env.SERVER_PORT || 8080);

//DATABASE DEFAULT
const DB_USERNAME = process.env.DB_USERNAME || "soerjo";
const DB_PASSWORD = process.env.DB_PASSWORD || "akucintayesus";
const DB_DATABASE = process.env.DB_DATABASE || "resfull-api";
const DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.6luep.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`;

//JWT DEFAULT
const JWT_SECRET = process.env.JWT_SECRET || "rahasia";

//EXPORT
export default {
  host: SERVER_HOSTNAME,
  port: SERVER_PORT,
  dbUri: DB_URI,
  jwtSecret: JWT_SECRET,
};
