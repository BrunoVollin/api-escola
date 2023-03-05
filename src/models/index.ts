import { Sequelize } from 'sequelize';
import Student from './studentModel';
import Teacher from './teacherModel';
import Class from './classModel';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

let models = [ Class, Student, Teacher ]
models.forEach(model => model.initialize(sequelize))

Class.belongsToMany(Student, { through: 'Classes_Students'})

Student.belongsToMany(Class, { through: 'Classes_Students'})

Class.belongsTo(Teacher)

Teacher.hasMany(Class)

sequelize.sync(
    // { force: true }
)

export {
    sequelize as Database,
    Class, Student, Teacher
}