import { Router } from 'express'
import CoursesController from '../controller/Courses.controller';
import { Request, Response } from 'express';
import { validateToken } from '../middlewares/validateLogin';
import validateAdmin from '../middlewares/validateAdmin';

const courseRouter = Router()
const coursesController = new CoursesController()

courseRouter.get('/courses',  validateToken, validateAdmin, (req: Request, res: Response) => coursesController.getCourses(req, res))
courseRouter.post('/courses', validateToken, validateAdmin, (req: Request, res: Response) => coursesController.createCourse(req, res))
courseRouter.get('/courses/:id',  validateToken, (req: Request, res: Response) => coursesController.getCourseById(req, res))
courseRouter.put('/courses/:id',  validateToken, validateAdmin, (req: Request, res: Response) => coursesController.updateCourseById(req, res))
courseRouter.delete('/courses/:id',  validateToken, validateAdmin, (req: Request, res: Response) => coursesController.deleteCourseById(req, res))

export default courseRouter