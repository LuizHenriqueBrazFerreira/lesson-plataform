import CoursesSequelize from '../database/models/Courses.model';
import { ICoursesModel } from '../interfaces/ICourses';
import LessonsSequelize from '../database/models/Lessons.model';

class CoursesModel implements ICoursesModel {
  private model = CoursesSequelize;

  async createCourse(title: string, forum = '', duration = '') {
    const course = await this.model.create({ title, forum, duration });

    return course;
  }

  async getCourses() {
    const courses = await this.model.findAll();

    return courses;
  }

  async getCourseById(id: number) {
    const course = await this.model.findByPk(id);

    return course;
  }

  async getCourseByTitle(courseTitle: string) {
    const course = await this.model.findOne({ where: { title: courseTitle } });

    return course;
  }

  async getCourseByLessonId(lessonId: number) {
    const course = await this.model.findOne({
      include: [{
        association: 'modules',
        include: [{
          model: LessonsSequelize,
          where: { id: lessonId },
        }],
      }],
    });
  
    return course;
  }

  async getCourseByModuleId(moduleId: number) {
    const course = await this.model.findOne({
      include: {
        association: 'modules',
        where: { id: moduleId },
      },
    });

    return course;
  }

  async updateCourseById(id: number, title: string, forum = '', duration = '') {
    const course = await this.model.update({ title, forum, duration }, { where: { id } });

    return course;
  }

  async deleteCourseById(id: number) {
    const course = await this.model.destroy({ where: { id } });

    return course;
  }
}     

export default CoursesModel;