import express from 'express';
import morgan from 'morgan';
import jwt from 'express-jwt';
import helmet from 'helmet';
import dotenv from 'dotenv';
import pino from 'pino';
import operationRouter from '@src/operation/routes/operation.routes';
import authRouter from '@src/auth/routes/auth.routes';
import getDatabaseService from '@src/database/database.service';

dotenv.config();
const app = express();
const dbConnect = getDatabaseService();
const logger = pino();

app.use(morgan('tiny'));
app.use(helmet());

app.use(express.json());
app.use('/api/auth', authRouter(dbConnect));
app.use(jwt({ secret: process.env.TOKEN_SECRET }));
app.use('/api/operation', operationRouter(dbConnect));

app.listen(process.env.PORT, () => {
  logger.info(`Finances app listening at http://localhost:${process.env.PORT}`);
});
