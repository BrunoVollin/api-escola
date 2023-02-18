import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../database/database';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  public static async findAllUsers(): Promise<User[]> {
    return User.findAll();
  }

  public static async findUserById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  public static async updateUserByEmail(email: string, updateData: Partial<User>) {
    return User.update(updateData, {
      where: { email },
    });
  }

  public static async deleteUserByEmail(email: string) {
    return User.destroy({
      where: { email },
    });
  }

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export { User };