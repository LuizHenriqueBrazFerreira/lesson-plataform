import {DataTypes, Model, QueryInterface} from 'sequelize';
import { CoursesDB } from '../../interfaces/Database'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<CoursesDB>>('Courses', {
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
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('Courses')
  }
}