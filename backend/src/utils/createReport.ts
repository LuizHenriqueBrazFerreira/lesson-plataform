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

    if (!subscribedUsers.length) return '<strong>Nenhum usuário inscrito encontrado</strong>';

    const courses: { [key: string]: Array<UserInfo> } = {};

    for (const user of subscribedUsers) {
      const userData = await this.#usersModel.findOne({ where: { id: user.userId } });

      const userInfo = {
        name: userData?.name ?? '',
        email: userData?.email ?? '',
        country: userData?.country ? userData?.country :  'Não informado',
        organization: userData?.organization ? userData?.organization :'Não informado' ,
      };

      if (!courses[user.courseTitle]) {
        courses[user.courseTitle] = [];
      }

      courses[user.courseTitle].push(userInfo);
    }

    return courses;
  }

  async transformReport() {
    const courses = await this.createReport();

    if (typeof courses === 'string') return courses;

    let html = '';

    for (const [courseTitle, students] of Object.entries(courses)) {
      html += `<h2 style="font-size: 20px;">Curso: ${courseTitle}</h2><ul>`;
      for (const student of students) {
        html += `<li>
               <strong>Nome:</strong> ${student.name}<br>
               <strong>Email:</strong> ${student.email}<br>
               <strong>País:</strong> ${student.country}<br>
               <strong>Organização:</strong> ${student.organization}
             </li>`;
      }
      html += '</ul>';
    }

    return html;
  }
}

export default CreateReport;