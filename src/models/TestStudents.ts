import {
    Association, DataTypes, Model, Sequelize,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManySetAssociationsMixin
} from 'sequelize'
import Test from './testModel';
import Student from './studentModel';


export default class TestStudent extends Model {
    public id!: number;
    public testId!: number;
    public studentId!: number;
    public grade!: number; // declare the grade attribute

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // setStudent
    public setStudant 



    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                grade: DataTypes.INTEGER, 
            },
            {
                sequelize,
                modelName: 'Tests_Students',
            },
        );
    }
}

