import express from 'express';
import morgan from 'morgan';
import { serverPort } from '@src/config';
import operationsRoutes from '@src/operation/operation.routes';

const app = express();

app.use(morgan('tiny'));
app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.json());
app.use('/operation', operationsRoutes);

app.listen(serverPort, () => {
    // tslint:disable-next-line:no-console
    console.log(`Finances app listening at http://localhost:${serverPort}`);
});
