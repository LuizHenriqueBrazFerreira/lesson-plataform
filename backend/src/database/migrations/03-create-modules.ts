import {DataTypes, Model, QueryInterface} from 'sequelize';
import { ModulesDB } from '../../interfaces/Database'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<ModulesDB>>('Modules', {
      id: {
        primaryKey: true,
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      courseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'course_id',
        references: {
          model: 'Courses',
          key: 'id'
      }},
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('Modules')
  }
}