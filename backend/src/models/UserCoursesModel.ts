import { IUserCoursesModel, IUserCourses } from '../interfaces/IUsers';
import UserCoursesSequelize from '../database/models/UserCourses.model';
import CoursesSequelize from '../database/models/Courses.model';
import CreateReport from '../utils/createReport';

class UserCoursesModel implements IUserCoursesModel {
  #model = UserCoursesSequelize;
  #coursesModel = CoursesSequelize;
  #report = new CreateReport();

  async createUserCourse({ userId, courseTitle, courseId, progress = 0, bookmarked = false, subscribed = false }: IUserCourses) {
    const userCourse = await this.#model.create({ userId, courseTitle, courseId, progress, bookmarked, subscribed });

    return userCourse;
  }

  async findCoursesByUserId(userId: number) {
    if (userId === 1) {
      const adminCourses = await this.#coursesModel.findAll();

      return adminCourses;
    }

    const userCourses = await this.#model.findAll({ where: { userId } });

    return userCourses;
  }


  async updateUserCourse(key: string, value: string, userId: number, courseId: number) {
    const [affectedCount] = await this.#model.update({ [key]: value }, { where: { userId, courseId } });

    return affectedCount;
  }

  async getAllSubscribedUsers() {
    const usersData = await this.#report.createReport();

    return usersData;
  }

  async getSubscribedUsersByCourse(courseTitle: string) {
    const usersData = await this.#report.createReportByCourse(courseTitle);

    return usersData;
  }

}

export default UserCoursesModel;