import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';

class UsersSequelize extends Model<InferAttributes<UsersSequelize>,
InferCreationAttributes<UsersSequelize>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare country: string;
  declare organization: string;
  declare role: 'ADMIN' | 'STUDENT';
  declare confirmEmailToken: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
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
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  organization: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize: db,
  modelName: 'Users',
  timestamps: true,
});

export default UsersSequelize;