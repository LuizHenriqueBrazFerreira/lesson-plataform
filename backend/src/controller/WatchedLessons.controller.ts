import WatchedLessonService from "../services/WatchedLesson.service";
import { Request, Response } from "express";
import { IWatchedLessonsController } from "../interfaces/IWatchedLessons";
import mapStatusHTTP from "../utils/mapHttp";

export default class WatchedLessonsController implements IWatchedLessonsController {
  constructor( private _service = new WatchedLessonService() ) {}

  async requestWatchedLessonsByUserIdAndModuleId(req: Request, res: Response) {
    const { userId, moduleId, watched } = req.body;

    const { status, data } = await this._service.requestWatchedLessonsByUserIdAndModuleId(Number(userId), Number(moduleId), watched);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async requestUpdateWatchedLesson(req: Request, res: Response) {
    const { userId, lessonId, watched } = req.body;
    

    const { status, data } = await this._service.updateWatchedLesson(Number(userId), Number(lessonId), watched);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}