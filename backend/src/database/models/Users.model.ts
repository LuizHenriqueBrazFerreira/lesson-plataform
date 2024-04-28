import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';
import UserCoursesSequelize from './UserCourses.model';

class UsersSequelize extends Model<InferAttributes<UsersSequelize>,
InferCreationAttributes<UsersSequelize>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: 'ADMIN' | 'STUDENT';
  declare confirmEmailToken: string | null;
}

UsersSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
 name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'STUDENT'
  },
  confirmEmailToken: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'confirm_email_token'
  },
}, {
  sequelize: db,
  modelName: 'Users',
  timestamps: false,
});

export default UsersSequelize;