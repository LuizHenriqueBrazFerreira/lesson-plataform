import LessonsService from "../services/Lessons.service";
import { Request, Response } from "express";
import mapStatusHttp from "../utils/mapHttp";
import { ILessonsController } from '../interfaces/ILessons';

class LessonsController implements ILessonsController {
  private service = new LessonsService();

  async createLesson(req: Request, res: Response) {
    const { moduleTitle, title, content, image, link } = req.body;

    const { status, data } = await this.service.createLesson(moduleTitle, title, content, image, link);

    return res.status(mapStatusHttp(status)).json(data);
  }

  async getLessons(_req: Request, res: Response) {
    const { status, data } = await this.service.getLessons();

    return res.status(mapStatusHttp(status)).json(data);
  }

  async getLessonById(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.service.getLessonById(Number(id));

    return res.status(mapStatusHttp(status)).json(data);
  }

  async getLessonsByModuleId(req: Request, res: Response) {
    const { moduleId } = req.params;

    const { status, data } = await this.service.getLessonsByModuleId(Number(moduleId));

    return res.status(mapStatusHttp(status)).json(data);
  }

  async updateLessonById(req: Request, res: Response) {
    const { id } = req.params;
    const { moduleTitle, title, content, image, link } = req.body;

    const { status, data } = await this.service.updateLessonById(Number(id), moduleTitle, title, content, image, link);

    return res.status(mapStatusHttp(status)).json(data);
  }

  async deleteLessonById(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.service.deleteLessonById(Number(id));

    return res.status(mapStatusHttp(status)).json(data);
  }
}

export default LessonsController;