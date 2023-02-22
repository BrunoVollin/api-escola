import { Request, Response } from 'express';
import { generateToken, getUserByToken } from '../auth';
import { Teacher } from '../models';
import Student from './../models/studentModel';
import Class from './../models/classModel';

class TeacherController {
    static registerTeacher = async (req: Request, res: Response): Promise<void> => {
        try {
            const { first, last, email, password } = req.body;
            const teacher = await Teacher.create({ first, last, email, password });

            res.status(201).json({ teacher });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    static loginTeacher = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const teacher = await Teacher.findOne({ where: { email, password } });
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

    static createClass = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, description } = req.body;


            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(401).json({ message: 'Token não fornecido' });
                return;
            };
            const { id } = getUserByToken(token) as Teacher;

            const teacher = await Teacher.findByPk(id);

            if (teacher) {
                const newClass = await teacher.createClass({ name, description });

                res.status(201).json({ newClass });
            } else {
                res.status(404).json({ message: 'Teacher not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    static addStudentToClass = async (req: Request, res: Response): Promise<void> => {
        try {
            const { studentId, classId } = req.body;
            const _class = await Class.findByPk(classId);
            if (_class) {
                const newClass = await _class.addStudent(studentId);

                res.status(201).json({ newClass });
            } else {
                res.status(404).json({ message: 'Student or class not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message, error });
        }
    };

    static getAllClasses = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(401).json({ message: 'Token não fornecido' });
                return;
            };
            const teacher = getUserByToken(token);

            //get all classes from teacher and send to front
            const classes = await Class.findAll({
                where: { teacherId: teacher.id },
                include: [
                    {
                        model: Student,
                        as: 'Students',
                        attributes: ['id', 'first', 'last', 'email'],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            })

            


            res.status(200).json({ teacher, classes });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

}



export default TeacherController;

