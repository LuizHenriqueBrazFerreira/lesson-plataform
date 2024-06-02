import LessonsController from '../controller/Lessons.controller';
import { Router } from 'express'
import { Request, Response } from 'express';
import { validateToken } from '../middlewares/validateLogin';
import validateAdmin from '../middlewares/validateAdmin';
import validateLessonAccess from '../middlewares/validateLessonAccess';
import validateModuleAccess from '../middlewares/validateModuleAccess';

const lessonRouter = Router()
const lessonsController = new LessonsController()

lessonRouter.get('/lessons',  validateToken, validateAdmin, (req: Request, res: Response) => lessonsController.getLessons(req, res))
lessonRouter.get('/lesson/:id',  validateToken, validateLessonAccess, (req: Request, res: Response) => lessonsController.getLessonById(req, res))
lessonRouter.get('/lessons/:moduleId',  validateToken, validateModuleAccess, (req: Request, res: Response) => lessonsController.getLessonsByModuleId(req, res))
lessonRouter.post('/lessons',  validateToken, validateAdmin, (req: Request, res: Response) => lessonsController.createLesson(req, res))
lessonRouter.put('/lessons/:id',  validateToken, validateAdmin, (req: Request, res: Response) => lessonsController.updateLessonById(req, res))
lessonRouter.delete('/lessons/:id',  validateToken, validateAdmin, (req: Request, res: Response) => lessonsController.deleteLessonById(req, res))

export default lessonRouter;