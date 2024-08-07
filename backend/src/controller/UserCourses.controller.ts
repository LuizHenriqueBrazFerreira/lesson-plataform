import { IUserCoursesController } from '../interfaces/IUsers';
import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapHttp';
import UserCoursesService from '../services/UserCourses.service';

class UserCoursesController implements IUserCoursesController {
  private userCoursesService = new UserCoursesService();

  async createUserCourse(req: Request, res: Response) {
    const { userId, courseTitle, courseId, progress, bookmarked, subscribed } = req.body;

    const { status, data } = await this.userCoursesService.createUserCourse({ userId, courseTitle, courseId, progress, bookmarked, subscribed });

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async requestUserCoursesByUserId(req: Request, res: Response) {
    const { userId } = req.params;

    const { status, data } = await this.userCoursesService.findCoursesByUserId(Number(userId));

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateUserCourse(req: Request, res: Response) {
    const { key, value, userId, courseId } = req.body;

    const { status, data } = await this.userCoursesService.updateUserCourse(key, value, userId, courseId);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async requestAllSubscribedUsers(req: Request, res: Response) {
    const { status, data } = await this.userCoursesService.getAllSubscribedUsers();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async requestSubscribedUsersByCourse(req: Request, res: Response) {
    const { courseTitle } = req.params;

    const { status, data } = await this.userCoursesService.getSubscribedUsersByCourse(courseTitle as string);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}               

export default UserCoursesController;