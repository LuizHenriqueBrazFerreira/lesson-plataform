import CoursesSequelize from '../database/models/Courses.model';
import { ICoursesModel } from '../interfaces/ICourses';

class CoursesModel implements ICoursesModel {
  private model = CoursesSequelize;

  async createCourse(title: string) {
    const course = await this.model.create({ title });

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

  async updateCourseById(id: number, title: string) {
    const course = await this.model.update({ title }, { where: { id } });

    return course;
  }

  async deleteCourseById(id: number) {
    const course = await this.model.destroy({ where: { id } });

    return course;
  }
}     

export default CoursesModel;