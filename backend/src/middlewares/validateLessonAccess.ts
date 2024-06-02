import { Request, Response, NextFunction } from 'express';
import CoursesModel from '../models/CoursesModel';

const validateLessonAccess = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const coursesIds = req.user?.courses.map((course) => course.courseId);
  const coursesModel = new CoursesModel();

  const course = await coursesModel.getCourseByLessonId(Number(id));

  if (coursesIds?.includes(course?.id ?? 0)) {
    return next();
  }

  return res.status(401).json({ message: 'Unauthorized' });
};

export default validateLessonAccess;