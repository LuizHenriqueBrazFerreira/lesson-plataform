import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';
import UserCoursesSequelize from './UserCourses.model';
import ModulesSequelize from './Modules.model';


class CoursesSequelize extends Model<InferAttributes<CoursesSequelize>,
InferCreationAttributes<CoursesSequelize>> {
  declare id: CreationOptional<number>;
  declare title: string;
}

CoursesSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Courses',
  timestamps: false,
});

export default CoursesSequelize;