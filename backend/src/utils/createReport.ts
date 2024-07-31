import UserCoursesSequelize from '../database/models/UserCourses.model';
import UsersSequelize from '../database/models/Users.model';

type UserInfo = {
  name?: string;
  email?: string;
  country?: string;
  organization?: string;
};

class CreateReport {
  #userCourseModel = UserCoursesSequelize;
  #usersModel = UsersSequelize;

  async createReport() {
    const subscribedUsers = await this.#userCourseModel.findAll({ where: { subscribed: true } });
  
    if (!subscribedUsers.length) return [];
  
    const courses: Array<{ course: string, users: UserInfo[] }> = [];
  
    for (const user of subscribedUsers) {
      const userData = await this.#usersModel.findOne({ where: { id: user.userId } });
  
      const userInfo: UserInfo = {
        name: userData?.name ?? '',
        email: userData?.email ?? '',
        country: userData?.country ? userData?.country : 'Não informado',
        organization: userData?.organization ? userData?.organization : 'Não informado',
      };
  
      let course = courses.find(course => course.course === user.courseTitle);
  
      if (!course) {
        course = { course: user.courseTitle, users: [] };
        courses.push(course);
      }
  
      course.users.push(userInfo);
    }
  
    return courses;
  }

  async createReportByCourse(courseTitle: string) {
    const subscribedUsers = await this.#userCourseModel.findAll({ where: { subscribed: true, courseTitle } });
  
    if (!subscribedUsers.length) return [];
  
    const courseData: Array<{ course: string, users: UserInfo[] }> = [];
  
    for (const user of subscribedUsers) {
      const userData = await this.#usersModel.findOne({ where: { id: user.userId } });
  
      const userInfo: UserInfo = {
        name: userData?.name ?? '',
        email: userData?.email ?? '',
        country: userData?.country ? userData?.country : 'Não informado',
        organization: userData?.organization ? userData?.organization : 'Não informado',
      };
  
      let course = courseData.find(course => course.course === courseTitle);
  
      if (!course) {
        course = { course: courseTitle, users: [] };
        courseData.push(course);
      }
  
      course.users.push(userInfo);
    }
  
    return courseData;
  }
}

export default CreateReport;