import LessonsController from '../controller/Lessons.controller';
import { Router } from 'express'
import { Request, Response } from 'express';

const lessonRouter = Router()
const lessonsController = new LessonsController()

lessonRouter.get('/lessons',  (req: Request, res: Response) => lessonsController.getLessons(req, res))
lessonRouter.get('/lesson/:id',  (req: Request, res: Response) => lessonsController.getLessonById(req, res))
lessonRouter.get('/lessons/:moduleId',  (req: Request, res: Response) => lessonsController.getLessonsByModuleId(req, res))
lessonRouter.post('/lessons',  (req: Request, res: Response) => lessonsController.createLesson(req, res))
lessonRouter.put('/lessons/:id',  (req: Request, res: Response) => lessonsController.updateLessonById(req, res))
lessonRouter.delete('/lessons/:id',  (req: Request, res: Response) => lessonsController.deleteLessonById(req, res))

export default lessonRouter;