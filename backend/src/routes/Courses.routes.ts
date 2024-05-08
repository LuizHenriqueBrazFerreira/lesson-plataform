import { Router } from 'express'
import CoursesController from '../controller/Courses.controller';
import { Request, Response } from 'express';

const courseRouter = Router()
const coursesController = new CoursesController()

courseRouter.get('/courses',  (req: Request, res: Response) => coursesController.getCourses(req, res))
courseRouter.post('/courses',  (req: Request, res: Response) => coursesController.createCourse(req, res))
courseRouter.get('/courses/:id',  (req: Request, res: Response) => coursesController.getCourseById(req, res))
courseRouter.put('/courses/:id',  (req: Request, res: Response) => coursesController.updateCourseById(req, res))
courseRouter.delete('/courses/:id',  (req: Request, res: Response) => coursesController.deleteCourseById(req, res))

export default courseRouter