import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from './index';
import LessonsSequelize from './Lessons.model';

class LessonPdfsSequelize extends Model<InferAttributes<LessonPdfsSequelize>,
InferCreationAttributes<LessonPdfsSequelize>> {
  declare lessonId: number;
  declare path: string;
}

LessonPdfsSequelize.init({
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

LessonsSequelize.hasMany(LessonPdfsSequelize, {
  foreignKey: 'lessonId',
  sourceKey: 'id',
});

LessonPdfsSequelize.belongsTo(LessonsSequelize, {
  foreignKey: 'id',
  targetKey: 'lessonId',
});

export default LessonPdfsSequelize;