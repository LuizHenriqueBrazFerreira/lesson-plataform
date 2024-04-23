import {DataTypes, Model, QueryInterface} from 'sequelize';
import { LessonsDB } from '../../types/Database'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<LessonsDB>>('Lessons', {
      id: {
        primaryKey: true,
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull:false,
        type: DataTypes.STRING
      },
      image: DataTypes.STRING,
      link: {
        type: DataTypes.STRING
      },
      topic: {
        allowNull: false,
        type: DataTypes.STRING
      },
      subTopic: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'sub_topic'
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('Lessons')
  }
}