import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import logger from 'morgan';

import router from './routes/index';

config();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  (err) => {
    if (err) {
      throw err;
    }
    console.log('mongodb connected');
  },
);

export default app;
