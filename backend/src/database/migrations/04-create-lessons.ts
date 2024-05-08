import {DataTypes, Model, QueryInterface} from 'sequelize';
import { LessonsDB } from '../../interfaces/Database'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<LessonsDB>>('Lessons', {
      id: {
        primaryKey: true,
        allowNull:false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      moduleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'module_id',
        references: {
          model: 'Modules',
          key: 'id'
        }
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
      link: DataTypes.STRING,
      watched: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('Lessons')
  }
}