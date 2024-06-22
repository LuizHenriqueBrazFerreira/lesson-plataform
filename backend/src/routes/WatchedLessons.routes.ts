import WatchedLessonsController from "../controller/WatchedLessons.controller";
import { Request, Response } from "express";
import { Router } from "express";
import { validateToken } from "../middlewares/validateLogin";
import validateAdmin from '../middlewares/validateAdmin';

const watchedLessonsRouter = Router();
const watchedLessonsController = new WatchedLessonsController();

watchedLessonsRouter.get('/watchedLessons', validateToken, validateAdmin, (req: Request, res: Response) => 
  watchedLessonsController.requestWatchedLessonsByUserIdAndModuleId(req, res));
watchedLessonsRouter.put('/watchedLessons', validateToken, (req: Request, res: Response) => 
  watchedLessonsController.requestUpdateWatchedLesson(req, res));

export default watchedLessonsRouter;