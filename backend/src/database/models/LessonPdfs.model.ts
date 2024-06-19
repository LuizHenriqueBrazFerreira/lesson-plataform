import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';
import LessonsSequelize from './Lessons.model';

class PdfLessonSequelize extends Model<InferAttributes<PdfLessonSequelize>,
InferCreationAttributes<PdfLessonSequelize>> {
  declare id: CreationOptional<number>;
  declare lessonId: number;
  declare path: string;
  declare title: string;
}

PdfLessonSequelize.init({
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
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'LessonPdfs',
  timestamps: false,
  underscored: true,
});

LessonsSequelize.hasMany(PdfLessonSequelize, {
  foreignKey: 'lessonId',
  sourceKey: 'id',
  as: 'pdfs'
});

PdfLessonSequelize.belongsTo(LessonsSequelize, {
  foreignKey: 'lessonId',
  targetKey: 'id',
});

export default PdfLessonSequelize;