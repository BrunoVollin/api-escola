import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRouter from './src/routes/teacherRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/users',usersRouter);

export default app;



