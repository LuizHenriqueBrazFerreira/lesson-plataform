import { ILessonsService } from '../interfaces/ILessons';
import LessonsModel from '../models/LessonsModel';

class LessonsService implements ILessonsService {
  private model = new LessonsModel();

  async createLesson(moduleId: number, title: string, content: string, image: string, link: string) {
    try {
      const lesson = await this.model.createLesson(moduleId, title, content, image, link);

      return { status: 'SUCCESSFUL', data: lesson };
    }
    catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar Lições' } };
    }
  }

  async getLessons() {
    try {
      const lessons = await this.model.getLessons();

      return { status: 'SUCCESSFUL', data: lessons };
    }
    catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar Lições' } };
    }
  }

  async getLessonById(id: number) {
    try {
      const lesson = await this.model.getLessonById(id);

      if (!lesson) {
        return { status: 'NOT_FOUND', data: { message: 'Lições não encontradas' } };
      }

      return { status: 'SUCCESSFUL', data: lesson };
    }
    catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar Lições' } };
    }
  }

  async updateLessonById(id: number, moduleId: number, title: string, content: string, image: string, link: string) {
    try {
      const lesson = await this.model.updateLessonById(id, moduleId, title, content, image, link);

      return { status: 'SUCCESSFUL', data: lesson };
    }
    catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao atualizar Lições' } };
    }
  }

  async deleteLessonById(id: number) {
    try {
      const lesson = await this.model.deleteLessonById(id);

      return { status: 'SUCCESSFUL', data: lesson };
    }
    catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao deletar Lições' } };
    }
  }
}   

export default LessonsService;
