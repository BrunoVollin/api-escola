import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../database/database';
import Teacher from './teacherModel';
import Student from './studentsModel';

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
    },
    {
        sequelize,
        modelName: 'Test',
        timestamps: false,
    }
);

Test.belongsTo(Teacher, { foreignKey: 'name' });
Test.belongsTo(Student, { foreignKey: 'name' });

export default Test;