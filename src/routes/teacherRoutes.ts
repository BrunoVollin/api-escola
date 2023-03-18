import { Router } from 'express';
import TeacherController from '../controller/teacherController';
import { verifyToken } from '../auth';

const teacherRouter = Router();

teacherRouter.post('/class', verifyToken, TeacherController.createClass);

teacherRouter.post('/class/student', verifyToken, TeacherController.addStudentToClass);

teacherRouter.get('/class', verifyToken, TeacherController.getAllClasses);

teacherRouter.post('/test', verifyToken, TeacherController.createTest);

teacherRouter.get('/test', verifyToken, TeacherController.getAllTests);

export default teacherRouter;
