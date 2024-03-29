import {Model, ModelDefined, DataTypes, Optional} from 'sequelize'
import db from './index'
import {UserDB} from '../../types/Database'

type UserInputFields = Optional<UserDB, 'id'>

type UserSequelizeCreator = ModelDefined<UserDB, UserInputFields>

export type UserSequelizeModel = Model<UserDB, UserInputFields>

const UserModel:UserSequelizeCreator = db.define('Users', {
  name: {
    allowNull:false,
    type: DataTypes.STRING,
  },
  email: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    allowNull:false,
    type: DataTypes.STRING
  }
}, {
  tableName: 'users',
  underscored:true,
  timestamps: false
})

export default UserModel;