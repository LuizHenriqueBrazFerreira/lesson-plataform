import {DataTypes, Model, QueryInterface} from 'sequelize';
import { ModuleProgressDB } from '../../interfaces/Database'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<ModuleProgressDB>>('ModulesProgress', {
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
      courseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'course_id',
        references: {
          model: 'Courses',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      progress: {
        allowNull:false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('ModulesProgress')
  }
}