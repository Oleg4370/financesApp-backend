import express from 'express';
import operations from './routes/operations';

const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
    console.log(`Request url - ${req.protocol}://${req.get('Host')}${req.originalUrl}`);
    next();
});
app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.json());
app.use('/operation', operations);

app.listen(port, () => console.log(`Finances app listening at http://localhost:${port}`));
