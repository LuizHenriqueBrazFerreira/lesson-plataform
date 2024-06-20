import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';
import LessonsSequelize from './Lessons.model';
import UsersSequelize from './Users.model';
import ModulesSequelize from './Modules.model';

class WatchedLessonSequelize extends Model<InferAttributes<WatchedLessonSequelize>,
InferCreationAttributes<WatchedLessonSequelize>> {
  declare id: CreationOptional<number>;
  declare lessonId: number;
  declare userId: number;
  declare moduleId: number;
  declare watched: boolean;
}

WatchedLessonSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  lessonId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'lesson_id',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'module_id',
  },
  watched: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize: db,
  tableName: 'WatchedLessons',
  timestamps: false,
  underscored: true,
});

LessonsSequelize.hasMany(WatchedLessonSequelize, {
  foreignKey: 'lessonId',
  sourceKey: 'id',
  as: 'watched'
});

UsersSequelize.hasMany(WatchedLessonSequelize, {
  foreignKey: 'userId',
  sourceKey: 'id',
  as: 'watched'
});

ModulesSequelize.hasMany(WatchedLessonSequelize, {
  foreignKey: 'moduleId',
  sourceKey: 'id',
  as: 'watched'
});

WatchedLessonSequelize.belongsToMany(LessonsSequelize, {
  foreignKey: 'lessonId',
  through: 'WatchedLessons',
  as: 'lesson',
});

WatchedLessonSequelize.belongsToMany(UsersSequelize, {
  foreignKey: 'userId',
  through: 'WatchedLessons',
  as: 'user',
});

WatchedLessonSequelize.belongsToMany(ModulesSequelize, {
  foreignKey: 'moduleId',
  through: 'WatchedLessons',
  as: 'module',
});


export default WatchedLessonSequelize;