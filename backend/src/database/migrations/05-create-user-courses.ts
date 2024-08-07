import {DataTypes, Model, QueryInterface} from 'sequelize';
import { UserCoursesDB } from '../../interfaces/Database'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<UserCoursesDB>>('UserCourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      courseTitle: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'course_title'
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
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      bookmarked: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      subscribed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      subscribedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'subscribed_at',
        defaultValue: null
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('UserCourses')
  }
}