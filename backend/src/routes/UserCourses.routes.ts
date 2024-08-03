import { Router } from 'express';
import { Request, Response } from 'express';
import { validateToken } from '../middlewares/validateLogin';
import UserCoursesController from '../controller/UserCourses.controller';
import validateUserOwnership from '../middlewares/validateUserOwnership';

const userCoursesRouter = Router();
const userCoursesController = new UserCoursesController();

userCoursesRouter.post('/user-courses',  validateToken, validateUserOwnership, (req: Request, res: Response) => userCoursesController.createUserCourse(req, res));
userCoursesRouter.get('/user-courses/:userId', validateToken, validateUserOwnership, (req: Request, res: Response) => userCoursesController.requestUserCoursesByUserId(req, res));
userCoursesRouter.put('/user-courses',  validateToken, validateUserOwnership, (req: Request, res: Response) => userCoursesController.updateUserCourse(req, res));
userCoursesRouter.get('/report', validateToken, (req: Request, res: Response) => userCoursesController.requestAllSubscribedUsers(req, res));
userCoursesRouter.get('/report/:courseTitle', validateToken, (req: Request, res: Response) => userCoursesController.requestSubscribedUsersByCourse(req, res));


export default userCoursesRouter;
