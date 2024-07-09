import { IUserCoursesModel, IUserCourses } from '../interfaces/IUsers';
import UserCoursesSequelize from '../database/models/UserCourses.model';
import CoursesSequelize from '../database/models/Courses.model';

class UserCoursesModel implements IUserCoursesModel {
  private model = UserCoursesSequelize;
  private coursesModel = CoursesSequelize;

  async createUserCourse({ userId, courseTitle, courseId, progress = 0, bookmarked = false }: IUserCourses) {
    const userCourse = await this.model.create({ userId, courseTitle, courseId, progress, bookmarked });

    return userCourse;
  }

  async findCoursesByUserId(userId: number) {
    if (userId === 1) {
      const adminCourses = await this.coursesModel.findAll();

      return adminCourses;
    }

    const userCourses = await this.model.findAll({ where: { userId } });

    return userCourses;
  }


  async updateUserCourse(key: string, value: string, userId: number, courseId: number) {
    const [affectedCount] = await this.model.update({ [key]: value }, { where: { userId, courseId } });

    return affectedCount;
  }
}

export default UserCoursesModel;