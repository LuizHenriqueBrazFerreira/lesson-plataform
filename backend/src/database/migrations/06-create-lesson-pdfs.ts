import {DataTypes, Model, QueryInterface} from 'sequelize';
import { PdfLessonDB } from '../../interfaces/Database'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<PdfLessonDB>>('LessonPdfs', {
      lessonId: {
        primaryKey: true,
        allowNull:false,
        field: 'lesson_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'Lessons',
          key: 'id'
        }
      },
      path: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('LessonPdfs')
  }
}