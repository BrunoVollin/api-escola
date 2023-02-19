import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import Classroom from './classroomModel';

class Student  {
    public name!: string;
    public register!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default Student;
