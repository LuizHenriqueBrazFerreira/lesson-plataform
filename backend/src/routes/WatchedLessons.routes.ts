import WatchedLessonsController from "../controller/WatchedLessons.controller";
import { Request, Response } from "express";
import { Router } from "express";
import { validateToken } from "../middlewares/validateLogin";

const watchedLessonsRouter = Router();
const watchedLessonsController = new WatchedLessonsController();

watchedLessonsRouter.get('/watchedLessons/:userId/:moduleId', validateToken, (req: Request, res: Response) => 
  watchedLessonsController.requestWatchedLessonsByUserIdAndModuleId(req, res));
watchedLessonsRouter.put('/watchedLessons', validateToken, (req: Request, res: Response) => 
  watchedLessonsController.requestUpdateWatchedLesson(req, res));
watchedLessonsRouter.get('/watchedLesson/:userId/:lessonId', validateToken, (req: Request, res: Response) =>
  watchedLessonsController.requestGetWatchedLessonByLessonId(req, res));

export default watchedLessonsRouter;