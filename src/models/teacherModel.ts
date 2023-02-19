import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import Classroom from './classroomModel';
import Student from './studentsModel';

class Teacher extends Model {
    public name!: string;
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static async login(email: any, password: any) {
        return Teacher.findOne({
            where: {
                email,
                password,
            },
        });
    }

    public static async getAllClassrooms(teacherEmail: string) {
        // get all classrooms from a teacher and all students from each classroom
        return Teacher.findOne({
            where: {
                email: teacherEmail,
            },
            include: [
                {
                    model: Classroom,
                    as: 'classrooms',
                    include: [
                        {
                            model: Student,
                            as: 'students',
                        },
                    ],
                },
            ],
        });

    }
}


Teacher.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
    },
    {
        sequelize,
        modelName: 'Teacher',
        timestamps: false,
    }
);

Teacher.hasMany(Classroom, { as: 'classrooms', foreignKey: 'teacherEmail' });

export default Teacher;
