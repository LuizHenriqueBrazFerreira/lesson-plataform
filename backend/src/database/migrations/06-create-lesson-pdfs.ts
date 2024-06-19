import {DataTypes, Model, QueryInterface} from 'sequelize';
import { PdfLessonDB } from '../../interfaces/Database'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<PdfLessonDB>>('LessonPdfs', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      lessonId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'lesson_id',
        references: {
          model: 'Lessons',
          key: 'id'
        }
      },
      path: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('LessonPdfs')
  }
}