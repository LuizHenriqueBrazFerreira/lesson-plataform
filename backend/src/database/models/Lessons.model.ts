import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';
import ModulesSequelize from './Modules.model';

class LessonsSequelize extends Model<InferAttributes<LessonsSequelize>,
InferCreationAttributes<LessonsSequelize>> {
  declare id: CreationOptional<number>;
  declare moduleId: number;
  declare title: string;
  declare content: string;
  declare image: string;
  declare link: string;
  declare watched: CreationOptional<boolean>;
}

LessonsSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'module_id',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  link: {
    type: DataTypes.STRING,
  },
  watched: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize: db,
  modelName: 'Lessons',
  timestamps: false,
});

LessonsSequelize.belongsTo(ModulesSequelize, {
  foreignKey: 'module_id',
  targetKey: 'id',
});

export default LessonsSequelize;