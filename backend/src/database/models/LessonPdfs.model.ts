import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from './index';
import LessonsSequelize from './Lessons.model';

class PdfLessonSequelize extends Model<InferAttributes<PdfLessonSequelize>,
InferCreationAttributes<PdfLessonSequelize>> {
  declare lessonId: number;
  declare path: string;
}

PdfLessonSequelize.init({
  lessonId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'lesson_id',
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'LessonPdfs',
  timestamps: false,
});

LessonsSequelize.hasMany(PdfLessonSequelize, {
  foreignKey: 'lessonId',
  sourceKey: 'id',
  as: 'pdfs',
});

PdfLessonSequelize.belongsTo(LessonsSequelize, {
  foreignKey: 'lessonId',
  targetKey: 'id',
});

export default PdfLessonSequelize;