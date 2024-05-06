import CoursesService from '../services/Courses.service';
import mapStatusHTTP from "../utils/mapHttp";
import { ICoursesController } from '../interfaces/ICourses';
import { Request, Response } from "express";

class CoursesController implements ICoursesController {
  constructor(private coursesService = new CoursesService()) {}

  async createCourse(req: Request, res: Response) {
    const { title } = req.body;

    const { status, data } = await this.coursesService.createCourse(title);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getCourses(req: Request, res: Response) {
    const { status, data } = await this.coursesService.getCourses();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getCourseById(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.coursesService.getCourseById(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateCourseById(req: Request, res: Response) {
    const { id } = req.params;
    const { title } = req.body;

    const { status, data } = await this.coursesService.updateCourseById(Number(id), title);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async deleteCourseById(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.coursesService.deleteCourseById(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default CoursesController;