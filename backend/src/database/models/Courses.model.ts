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
  declare duration: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
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
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize: db,
  modelName: 'Courses',
  timestamps: true,
});

export default CoursesSequelize;