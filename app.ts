import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import teacherRoutes from './src/routes/teacherRoutes';
import usersRouter from './src/routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/users',usersRouter);
app.use('/teacher',teacherRoutes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


export default app;
