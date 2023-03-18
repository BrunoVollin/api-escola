import { Request, Response } from 'express';
import { generateToken, getUserByToken } from '../auth';
import { Teacher } from '../models';
import Student from './../models/studentModel';
import Class from './../models/classModel';
import UserLoginMap, { UserLoginMapType } from './../utils/usersLogin';
import TestStudent from '../models/TestStudents';

export default class TeacherController {

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
            console.log(teacher);

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

    static createTest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, description, classId } = req.body;
            const _class = await Class.findByPk(classId);
            if (_class) {
                const newTest = await _class.createTest({ name, description });

                res.status(201).json({ newTest });
            } else {
                res.status(404).json({ message: 'Class not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    static getAllTests = async (req: Request, res: Response): Promise<void> => {
        try {
            const { classId } = req.query
            const _class = await Class.findByPk(classId as unknown as number);
            if (_class) {
                const tests = await _class.getTests(
                    {
                        include: [
                            {
                                model: Student,
                                as: 'Students',
                                attributes: ['id', 'first', 'last', 'email'],
                                include: [
                                    {
                                        model: TestStudent,
                                        as: "grade",
                                        attributes: ["grade"]
                                    }

                                ]
                            },
                        ],
                    }
                );


                res.status(200).json({ tests });
            } else {
                res.status(404).json({ message: 'Class not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };


}
