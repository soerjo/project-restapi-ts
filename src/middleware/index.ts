import express, { RequestHandler } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

const plugins: RequestHandler[] = [
  helmet(),
  cors({ credentials: true, origin: true }),
  express.json(),
  morgan('dev'),
  express.urlencoded({ extended: false }),
  compression(),
];

export { plugins };
