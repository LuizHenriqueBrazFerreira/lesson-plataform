import { IUserCoursesModel, IUserCourses } from '../interfaces/IUsers';
import UserCoursesSequelize from '../database/models/UserCourses.model';

class UserCoursesModel implements IUserCoursesModel {
  private model = UserCoursesSequelize;

  async createUserCourse({ userId, courseId, progress = 0, bookmarked = false }: IUserCourses) {
    const userCourse = await this.model.create({ userId, courseId, progress, bookmarked });

    return userCourse;
  }

  async findCoursesByUserId(userId: number) {
    const userCourses = await this.model.findAll({ where: { userId } });

    return userCourses;
  }


  async updateUserCourse(key: string, value: string, userId: number, courseId: number) {
    const [affectedCount] = await this.model.update({ [key]: value }, { where: { userId, courseId } });

    return affectedCount;
  }
}

export default UserCoursesModel;