import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../database/database';
import Teacher from './teacherModel';
import Student from './studentsModel';
import Classroom from './classroomModel';

class Test extends Model {
    public name!: string;
    public value!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Test.init(
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        value: {
            type: DataTypes.NUMBER,
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
        ClassroomName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Test',
        timestamps: false,
    }
);



export default Test;