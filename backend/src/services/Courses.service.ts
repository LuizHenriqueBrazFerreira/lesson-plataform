import { ICoursesService } from '../interfaces/ICourses';
import CoursesModel from '../models/CoursesModel';

class CoursesService implements ICoursesService {
  private coursesModel = new CoursesModel();

  async createCourse(title: string) {
    try {
      const course = await this.coursesModel.createCourse(title);

      return { status: 'CREATED', data: course}
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar curso.' } };
    }
  }

  async getCourses() {
    try {
      const courses = await this.coursesModel.getCourses();

      return { status: 'SUCCESSFUL', data: courses };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar cursos.' } };
    }
  }

  async getCourseById(id: number) {
    try {
      const course = await this.coursesModel.getCourseById(id);

      return { status: 'SUCCESSFUL', data: course };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar curso.' } };
    }
  }

  async updateCourseById(id: number, title: string) {
    try {
      const updatedCourse = await this.coursesModel.updateCourseById(id, title);

      return { status: 'SUCCESSFUL', data: updatedCourse };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao atualizar curso.' } };  
    }
  }

  async deleteCourseById(id: number) {
    try {
      const deletedCourse = await this.coursesModel.deleteCourseById(id);

      return { status: 'SUCCESSFUL', data: deletedCourse };

    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao deletar curso.' } };
    }
  }
}

export default CoursesService;