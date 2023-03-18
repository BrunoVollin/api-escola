import { DataTypes, Op, Sequelize } from 'sequelize';
import Student from './studentModel';
import Teacher from './teacherModel';
import Class from './classModel';
import Test from './testModel';
import TestStudent from './TestStudents';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

let models = [Class, Student, Teacher, Test, TestStudent]
models.forEach(model => model.initialize(sequelize))

Class.belongsToMany(Student, { through: 'Classes_Students' })
Class.belongsTo(Teacher)
Class.hasMany(Test)

Student.belongsToMany(Class, { through: 'Classes_Students' })

Teacher.hasMany(Class)
Test.belongsTo(Teacher)
Test.belongsTo(Class)

Test.belongsToMany(Student, {
  through: TestStudent, //
});

Student.belongsToMany(Test, {
  through: TestStudent, // use the TestStudent model as the join table
});

sequelize.sync(
  // { force: true }
)

export {
  sequelize as Database,
  Class, Student, Teacher, Test
}