import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';
import CoursesSequelize from './Courses.model';
import UsersSequelize from './Users.model';


class UserCoursesSequelize extends Model<InferAttributes<UserCoursesSequelize>,
InferCreationAttributes<UserCoursesSequelize>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare courseTitle: string;
  declare courseId: number;
  declare progress: number;
  declare bookmarked: boolean;
  declare subscribed: boolean;
  declare subscribedAt: CreationOptional<Date>;;
}

UserCoursesSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'user_id',
  },
  courseTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'course_title',
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'course_id',
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
  subscribed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  subscribedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'subscribed_at',
    defaultValue: null,
  },
}, {
  sequelize: db,
  modelName: 'UserCourses',
  timestamps: false,
});

UsersSequelize.hasMany(UserCoursesSequelize, {
  foreignKey: 'userId',
  sourceKey: 'id',
});

CoursesSequelize.hasMany(UserCoursesSequelize, {
  foreignKey: 'courseId',
  sourceKey: 'id',
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
