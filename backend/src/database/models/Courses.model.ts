import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';

class CoursesSequelize extends Model<InferAttributes<CoursesSequelize>,
InferCreationAttributes<CoursesSequelize>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare forum: string;
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
  forum: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
}, {
  sequelize: db,
  modelName: 'Courses',
  timestamps: false,
});

export default CoursesSequelize;