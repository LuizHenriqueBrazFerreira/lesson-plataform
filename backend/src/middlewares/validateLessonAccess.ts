import { Request, Response, NextFunction } from 'express';
import CoursesModel from '../models/CoursesModel';

const validateLessonAccess = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const role = req.user?.role;
  const coursesIds = req.user?.courses.map((course) => course.courseId);
  const coursesModel = new CoursesModel();

  const course = await coursesModel.getCourseByLessonId(Number(id));

  if (coursesIds?.includes(course?.id ?? 0) || role === 'ADMIN') {
    return next();
  }

  return res.status(401).json({ message: 'Acesso à aula negado' });
};

export default validateLessonAccess;