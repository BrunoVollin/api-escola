import { Router } from 'express';
import TeacherController from '../controller/teacherController';
import { verifyToken } from '../auth';

const teachersRouter = Router();

teachersRouter.post('/register', TeacherController.registerTeacher);

teachersRouter.post('/login', TeacherController.loginTeacher);

teachersRouter.post('/class', verifyToken, TeacherController.createClass);

teachersRouter.post('/class/student', verifyToken, TeacherController.addStudentToClass);

teachersRouter.get('/class', verifyToken, TeacherController.getAllClasses);

export default teachersRouter;
