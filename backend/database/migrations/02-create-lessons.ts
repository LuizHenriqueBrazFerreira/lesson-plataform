import {DataTypes, Model, QueryInterface} from 'sequelize';
import {LessonsDB} from '../../types/Database'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<LessonsDB>>('Lessons', {
      id: {
        primaryKey: true,
        allowNull:false,
        type: DataTypes.STRING,
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
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      link: {
        allowNull: false,
        type: DataTypes.STRING
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('Lessons')
  }
}