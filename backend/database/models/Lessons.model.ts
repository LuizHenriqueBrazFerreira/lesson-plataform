import {Model, ModelDefined, Optional, DataTypes} from 'sequelize'
import db from './index'
import {LessonsDB} from '../../types/Database'

type LessonsWithoutInputs = Optional<LessonsDB, 'id'>

type LessonsSequelizeCreator = ModelDefined<LessonsDB, LessonsWithoutInputs>

export type LessonsSequelizeModel = Model<LessonsDB, LessonsWithoutInputs>

const LessonsModel:LessonsSequelizeCreator = db.define('Lessons', {
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING
  },
  image: DataTypes.STRING,
  link: {
    allowNull: false,
    type: DataTypes.STRING
  },
  topic: {
    allowNull: false,
    type: DataTypes.STRING
  },
  subTopic: {
    allowNull: false,
    type: DataTypes.STRING
  }
}, {
  tableName: 'lessons',
  underscored: true,
  timestamps: false
})

export default LessonsModel;
