import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from './index';
import CoursesSequelize from './Courses.model';
import UsersSequelize from './Users.model';


class UserCoursesSequelize extends Model<InferAttributes<UserCoursesSequelize>,
InferCreationAttributes<UserCoursesSequelize>> {
  declare userId: number;
  declare courseId: number;
  declare progress: number;
  declare bookmarked: boolean;
}

UserCoursesSequelize.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  bookmarked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize: db,
  modelName: 'UserCourses',
  timestamps: false,
});

UserCoursesSequelize.belongsTo(CoursesSequelize, {
  foreignKey: 'courseId',
  targetKey: 'id',
});

UserCoursesSequelize.belongsTo(UsersSequelize, {
  foreignKey: 'userId',
  targetKey: 'id',
});

export default UserCoursesSequelize;
