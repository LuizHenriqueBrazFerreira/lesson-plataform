import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';
import CoursesSequelize from './Courses.model';
import LessonsSequelize from './Lessons.model';


class ModulesSequelize extends Model<InferAttributes<ModulesSequelize>,
InferCreationAttributes<ModulesSequelize>> {
  declare id: CreationOptional<number>;
  declare courseId: number;
  declare title: string;
}

ModulesSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'course_id',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Modules',
  timestamps: false,
});

CoursesSequelize.hasMany(ModulesSequelize, {
  foreignKey: 'courseId',
  sourceKey: 'id',
  as: 'modules',
});

ModulesSequelize.belongsTo(CoursesSequelize, {
  foreignKey: 'courseId',
  targetKey: 'id',
}); 


export default ModulesSequelize;