import { Request, Response } from 'express';
import { generateToken, getUserByToken } from '../auth';
import { Teacher } from '../models';
import Student from './../models/studentModel';
import Class from './../models/classModel';
import UserLoginMap, { UserLoginMapType } from './../utils/usersLogin';

class UserController {
    static register = async (req: Request, res: Response): Promise<void> => {
        try {
            const { first, last, email, password, userType } = req.body;

            if (userType === "teacher") {
                const teacher = await Teacher.create({ first, last, email, password });
                res.status(201).json({ teacher });
            } else if (userType === "student") {
                const student = await Student.create({ first, last, email, password });
                res.status(201).json({ student });
            }
            else {
                res.status(400).json({ message: 'Invalid user type' });
            }

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    static login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password, userType } = req.body as { email: string, password: string, userType: UserLoginMapType };
            const user = await UserLoginMap[userType].getUserFromDatabase(email, password);
            if (user) {
                const token = generateToken({ id: 1, email });

                res.status(200).json({ token, user });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

}



export default UserController;

