import { Router } from 'express';
import UserController from './../controller/userController';

const usersRouter = Router();

usersRouter.post('/register', UserController.register);

usersRouter.post('/login', UserController.login);


export default usersRouter;
