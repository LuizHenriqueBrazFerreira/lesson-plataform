import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from './index';
import CoursesSequelize from './Courses.model';
import UsersSequelize from './Users.model';
import ModulesSequelize from './Modules.model';

class ModulesProgressSequelize extends Model<InferAttributes<ModulesProgressSequelize>,
InferCreationAttributes<ModulesProgressSequelize>> {
  declare courseId: number;
  declare userId: number;
  declare moduleId: number;
  declare progress: number;
}

ModulesProgressSequelize.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'user_id',
  },
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'module_id',
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
}, {
  sequelize: db,
  tableName: 'ModulesProgress',
  timestamps: false,
  underscored: true,
});

UsersSequelize.hasMany(ModulesProgressSequelize, {
  foreignKey: 'userId',
  sourceKey: 'id',
  as: 'progress',
});

ModulesSequelize.hasMany(ModulesProgressSequelize, {
  foreignKey: 'moduleId',
  sourceKey: 'id',
  as: 'progress',
});

CoursesSequelize.hasMany(ModulesProgressSequelize, {
  foreignKey: 'courseId',
  sourceKey: 'id',
  as: 'progress',
});


ModulesProgressSequelize.belongsToMany(UsersSequelize, {
  foreignKey: 'userId',
  through: 'ModulesProgress',
  as: 'user',
});

ModulesProgressSequelize.belongsToMany(ModulesSequelize, {
  foreignKey: 'moduleId',
  through: 'ModulesProgress',
  as: 'module',
});

ModulesProgressSequelize.belongsToMany(CoursesSequelize, {
  foreignKey: 'courseId',
  through: 'ModulesProgress',
  as: 'course',
});

export default ModulesProgressSequelize;