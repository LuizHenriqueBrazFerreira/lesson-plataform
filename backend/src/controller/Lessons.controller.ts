import LessonsService from "../services/Lessons.service";
import { Request, Response } from "express";
import mapStatusHttp from "../utils/mapHttp";
import { ILessonsController } from '../interfaces/ILessons';

class LessonsController implements ILessonsController {
  private service = new LessonsService();

  async createLesson(req: Request, res: Response) {
    const { moduleId, title, content, image, link } = req.body;

    const response = await this.service.createLesson(moduleId, title, content, image, link);

    return res.status(mapStatusHttp(response.status)).json(response);
  }

  async getLessons(_req: Request, res: Response) {
    const response = await this.service.getLessons();

    return res.status(mapStatusHttp(response.status)).json(response);
  }

  async getLessonById(req: Request, res: Response) {
    const { id } = req.params;

    const response = await this.service.getLessonById(Number(id));

    return res.status(mapStatusHttp(response.status)).json(response);
  }

  async updateLessonById(req: Request, res: Response) {
    const { id } = req.params;
    const { moduleId, title, content, image, link } = req.body;

    const response = await this.service.updateLessonById(Number(id), moduleId, title, content, image, link);

    return res.status(mapStatusHttp(response.status)).json(response);
  }

  async deleteLessonById(req: Request, res: Response) {
    const { id } = req.params;

    const response = await this.service.deleteLessonById(Number(id));

    return res.status(mapStatusHttp(response.status)).json(response);
  }
}

export default LessonsController;