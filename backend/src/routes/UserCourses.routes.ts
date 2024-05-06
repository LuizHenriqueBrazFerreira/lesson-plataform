import { Router } from 'express';
import UserCoursesController from '../controller/UserCourses.controller';
import { Request, Response } from 'express';

const userCoursesRouter = Router();
const userCoursesController = new UserCoursesController();

userCoursesRouter.post('/user-courses',  (req: Request, res: Response) => userCoursesController.createUserCourse(req, res));
userCoursesRouter.get('/user-courses/:userId', (req: Request, res: Response) => userCoursesController.requestUserCoursesByUserId(req, res));
userCoursesRouter.put('/user-courses',  (req: Request, res: Response) => userCoursesController.updateUserCourse(req, res));

export default userCoursesRouter;
