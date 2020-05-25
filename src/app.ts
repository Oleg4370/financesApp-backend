import express from 'express';
import morgan from 'morgan';
import jwt from 'express-jwt';
import helmet from 'helmet';
import pino from 'pino';
import { config } from '@src/config';
import { operationRouter } from '@src/operation/routes/operation.routes';
import { authRouter } from '@src/auth/routes/auth.routes';
import { getDatabaseService } from '@src/database/database.service';

const app = express();
const dbConnect = getDatabaseService();
const logger = pino();

app.use(morgan('tiny'));
app.use(helmet());

app.use(express.json());
app.use('/api/auth', authRouter(dbConnect));
app.use(jwt({ secret: config.token.secret }));
app.use('/api/operation', operationRouter(dbConnect));

app.listen(config.server.port, () => {
  logger.info(`Finances app listening at http://localhost:${config.server.port}`);
});
