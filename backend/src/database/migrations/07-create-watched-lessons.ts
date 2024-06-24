import {DataTypes, Model, QueryInterface} from 'sequelize';
import { WatchedLessonDB } from '../../interfaces/Database'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<WatchedLessonDB>>('WatchedLessons', {
      lessonId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'lesson_id',
        references: {
          model: 'Lessons',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      moduleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'module_id',
        references: {
          model: 'Modules',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      watched: {
        allowNull:false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('WatchedLessons')
  }
}