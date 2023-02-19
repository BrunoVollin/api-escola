import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { generateToken } from '../auth';
import Teacher from './../models/teacherModel';

class TeacherController {

    static loginTeacher = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const teacher = await Teacher.login(email, password);
            if (teacher) {
                const token = generateToken({ id: 1, email });

                res.status(200).json({ token, teacher });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    static registerTeacher = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, password } = req.body;
            const teacher = await Teacher.create({
                name,
                email,
                password,
            });

            res.status(201).json({ teacher });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    static getAllClassrooms = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.params;
            const classrooms = await Teacher.getAllClassrooms(email);

            res.status(200).json({ classrooms });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default TeacherController;

