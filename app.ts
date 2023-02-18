import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/routes/userRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/users', router);

export default app;



