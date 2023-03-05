import { Teacher } from "../models";
import Student from './../models/studentModel';

abstract class Login {
    abstract getUserFromDatabase(email: string, password: string): void;
}

class TeacherLogin extends Login {
    async getUserFromDatabase(email: string, password: string) {
        return await Teacher.findOne({ where: { email, password } });
    }
}

class StudentLogin extends Login {
    async getUserFromDatabase(email: string, password: string) {
        return await Student.findOne({ where: { email, password } });
    }
}

export type UserLoginMapType = "teacher" | "student";

const UserLoginMap = {
    teacher: new TeacherLogin(),
    student: new StudentLogin(),
}

export default UserLoginMap;