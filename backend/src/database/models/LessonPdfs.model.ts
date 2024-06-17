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
  modelName: 'PdfLessons',
  timestamps: false,
});

LessonsSequelize.hasMany(PdfLessonSequelize, {
  foreignKey: 'lessonId',
  sourceKey: 'id',
});

PdfLessonSequelize.belongsTo(LessonsSequelize, {
  foreignKey: 'id',
  targetKey: 'lessonId',
});

export default PdfLessonSequelize;