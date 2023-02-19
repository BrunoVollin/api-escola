import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../database/database';

class Teacher extends Model {
    public name!: string;
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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

export default Teacher;