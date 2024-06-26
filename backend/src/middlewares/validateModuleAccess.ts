import { Request, Response, NextFunction } from 'express';
import CoursesModel from '../models/CoursesModel';

const validateModuleAccess = async (req: Request, res: Response, next: NextFunction) => {
  const { moduleId } = req.params;
  const coursesIds = req.user?.courses.map((course) => course.courseId);
  const coursesModel = new CoursesModel();
  const role = req.user?.role;

  const course = await coursesModel.getCourseByModuleId(Number(moduleId));

  if (coursesIds?.includes(course?.id ?? 0) || role === 'ADMIN' ){
    return next();
  }

  return res.status(401).json({ message: 'Acesso ao módulo não autorizado' });
};

export default validateModuleAccess;