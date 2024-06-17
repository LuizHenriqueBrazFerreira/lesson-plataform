import { Router } from 'express';
import UserCoursesController from '../controller/UserCourses.controller';
import { Request, Response } from 'express';
import { validateToken } from '../middlewares/validateLogin';
import validateUserOwnership from '../middlewares/validateUserOwnership';

const userCoursesRouter = Router();
const userCoursesController = new UserCoursesController();

userCoursesRouter.post('/user-courses',  validateToken, validateUserOwnership, (req: Request, res: Response) => userCoursesController.createUserCourse(req, res));
userCoursesRouter.get('/user-courses/:userId', validateToken, validateUserOwnership, (req: Request, res: Response) => userCoursesController.requestUserCoursesByUserId(req, res));
userCoursesRouter.put('/user-courses',  validateToken, validateUserOwnership, (req: Request, res: Response) => userCoursesController.updateUserCourse(req, res));

export default userCoursesRouter;
