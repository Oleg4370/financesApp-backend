import express from 'express';
import morgan from 'morgan';
import {serverPort} from '@src/config';
import operationRouter from '@src/operation/operation.routes';
import getDatabaseService from '@src/database/services/database.service';

const app = express();
const dbConnect = getDatabaseService();

app.use(morgan('tiny'));
app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.json());
app.use('/api/operation', operationRouter(dbConnect));

app.listen(serverPort, () => {
  // tslint:disable-next-line:no-console
  console.log(`Finances app listening at http://localhost:${serverPort}`);
});
