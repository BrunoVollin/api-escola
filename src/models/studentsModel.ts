import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../database/database';
import Teacher from './teacherModel';

class Student extends Model {
    public name!: string;
    public value!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Student.init(
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        value: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Student',
        timestamps: false,
    }
);

Student.belongsTo(Teacher, { foreignKey: 'name' });

export default Student;