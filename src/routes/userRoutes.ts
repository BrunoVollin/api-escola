import { Router } from 'express';
import { createUser, getUser, updateUser, deleteUser, loginUser } from '../controller/userController';
import { verifyToken } from '../auth';

const usersRouter = Router();


usersRouter.get('/', getUser);

usersRouter.post('/', createUser);

usersRouter.put('/:email', updateUser);

usersRouter.delete(':email', deleteUser);

usersRouter.post('/login', loginUser);

export default usersRouter;
