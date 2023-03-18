//  test has n  Students 
//  test has  1  Teacher
//  test has 1 class 
// test has variable: name, description, value and score

import {
    Association, DataTypes, Model, Sequelize,
    BelongsToCreateAssociationMixin,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyHasAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManySetAssociationsMixin
} from 'sequelize'

import Student from './studentModel'
import Teacher from './teacherModel'
import Class from './classModel'


export default class Test extends Model {
    public name!: string
    public description!: string
    public value!: number
    public score!: number

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    // Student association methods
    public addStudent!: BelongsToManyAddAssociationMixin<Student, number>
    public addStudents!: BelongsToManyAddAssociationsMixin<Student, number>
    public countStudents!: BelongsToManyCountAssociationsMixin
    public createStudent!: BelongsToManyCreateAssociationMixin<Student>
    public getStudents!: BelongsToManyGetAssociationsMixin<Student>
    public hasStudent!: BelongsToManyHasAssociationMixin<Student, number>
    public hasStudents!: BelongsToManyHasAssociationsMixin<Student, number>
    public removeStudent!: BelongsToManyRemoveAssociationMixin<Student, number>
    public removeStudents!: BelongsToManyRemoveAssociationsMixin<Student, number>
    public setStudents!: BelongsToManySetAssociationsMixin<Student, number>

    // Teacher association methods
    public createTeacher!: BelongsToCreateAssociationMixin<Teacher>
    public getTeacher!: BelongsToGetAssociationMixin<Teacher>
    public setTeacher!: BelongsToSetAssociationMixin<Teacher, number>

    // Class association methods
    public createClass!: BelongsToCreateAssociationMixin<Class>
    public getClass!: BelongsToGetAssociationMixin<Class>
    public setClass!: BelongsToSetAssociationMixin<Class, number>
    

    // Populated for inclusions
    public readonly Students?: Student[]
    public readonly Teacher?: Teacher

    public static associations: {
        Students: Association<Test, Student>
        Teacher: Association<Test, Teacher>
    }

    public static initialize(sequelize: Sequelize) {
        this.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            value: DataTypes.INTEGER,
            score: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'Tests'
        })
    }

}

