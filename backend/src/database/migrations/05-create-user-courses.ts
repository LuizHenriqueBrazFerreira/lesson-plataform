import {DataTypes, Model, QueryInterface} from 'sequelize';
import { UserCoursesDB } from '../../interfaces/Database'

export default {
  up(queryInterface:QueryInterface) {
    return queryInterface.createTable<Model<UserCoursesDB>>('UserCourses', {
      userId: {
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id'
      }},
      courseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'course_id',
        references: {
          model: 'Courses',
          key: 'id'
      }},
      progress: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      bookmarked: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: false
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('UserCourses')
  }
}