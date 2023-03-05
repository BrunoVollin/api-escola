import { Router } from 'express';
import UserController from '../controller/userController';
import { verifyToken } from '../auth';

const usersRouter = Router();

usersRouter.post('/register', UserController.register);

usersRouter.post('/login', UserController.login);

usersRouter.post('/class', verifyToken, UserController.createClass);

usersRouter.post('/class/student', verifyToken, UserController.addStudentToClass);

usersRouter.get('/class', verifyToken, UserController.getAllClasses);

export default usersRouter;
