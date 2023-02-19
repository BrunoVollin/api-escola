import { Router } from 'express';
import TeacherController from '../controller/teacherController';

const teachersRouter = Router();

teachersRouter.post('/login', TeacherController.loginTeacher);

teachersRouter.post('/register', TeacherController.registerTeacher);

teachersRouter.get('/classrooms/:email', TeacherController.getAllClassrooms);

export default teachersRouter;