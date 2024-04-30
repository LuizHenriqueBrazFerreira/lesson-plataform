import { IUserCoursesController } from '../interfaces/IUsers';
import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapHttp';
import UserCoursesService from '../services/UserCourses.service';

class UserCoursesController implements IUserCoursesController {
  private userCoursesService = new UserCoursesService();

  async createUserCourse(req: Request, res: Response) {
    const { userId, courseTitle, courseId, progress, bookmarked } = req.body;

    const response = await this.userCoursesService.createUserCourse({ userId, courseTitle, courseId, progress, bookmarked });

    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  async requestUserCoursesByUserId(req: Request, res: Response) {
    const { userId } = req.params;

    const response = await this.userCoursesService.findCoursesByUserId(Number(userId));

    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  async updateUserCourse(req: Request, res: Response) {
    const { key, value, userId, courseId } = req.body;

    const response = await this.userCoursesService.updateUserCourse(key, value, userId, courseId);

    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }
}               

export default UserCoursesController;