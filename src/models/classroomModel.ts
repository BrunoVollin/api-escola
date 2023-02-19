import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import Teacher from './teacherModel';
import Student from './studentsModel';

class Classroom extends Model {
    public name!: string;
    public subject!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Classroom.init(
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teacherEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        studentRegister: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Classroom',
        timestamps: false,
    }
);


export default Classroom;
