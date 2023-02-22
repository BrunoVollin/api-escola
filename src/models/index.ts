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

// Many students in each class
Class.belongsToMany(Student, { through: 'Classes_Students'})
// Many classes for each student
Student.belongsToMany(Class, { through: 'Classes_Students'})

// One teacher for each class
Class.belongsTo(Teacher)
// Many classes for one teacher
Teacher.hasMany(Class)


// Create database tables
//   force: true causes database to reset with each run
sequelize.sync()

export {
    sequelize as Database,
    Class, Student, Teacher
}