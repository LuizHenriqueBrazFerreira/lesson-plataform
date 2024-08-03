import { ILessonsService } from '../interfaces/ILessons';
import LessonsModel from '../models/LessonsModel';
import ModulesModel from '../models/ModulesModel';
import {UpdateTables} from '../utils/updateTables'
class LessonsService implements ILessonsService {
  private model = new LessonsModel();
  private _moduleModel = new ModulesModel()

  async createLesson(moduleTitle: string, title: string, content: string) {
    const updateTable = new UpdateTables()
    try {
      const moduleExists = await this._moduleModel.getModuleByTitle(moduleTitle);

      if (!moduleExists) return { status: 'NOT_FOUND', data: { message: 'Módulo não encontrado' } };

      if (!title || !content ) return { status: 'BAD_REQUEST', data: { message: 'Campos obrigatórios não preenchidos' } };
      
      
      const moduleId = moduleExists.id;
      const lesson = await this.model.createLesson(moduleId, title, content);

      updateTable.updateLessonWatched(lesson.id, moduleId);

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
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: `Erro ao buscar todas as lições: ${error}` } };
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
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: `Erro ao buscar lição: ${error}` } };
    }
  }

  async getLessonsByModuleId(moduleId: number) {
    try {
      const lessons = await this.model.getLessonsByModuleId(moduleId);

      return { status: 'SUCCESSFUL', data: lessons };
    }
    catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: `Erro ao buscar lições: ${error}` } };
    }
  }

  async updateLessonById(id: number, moduleTitle: string, title: string, content: string) {
    try {
      if (!title || !content) return { status: 'BAD_REQUEST', data: { message: 'Campos obrigatórios não preenchidos' } };

      const moduleExists = await this._moduleModel.getModuleByTitle(moduleTitle);

      if (!moduleExists) return { status: 'NOT_FOUND', data: { message: `Módulo não encontrado, módulo atual: ${moduleTitle}` } };
      
      const moduleId = moduleExists.id;
      const lesson = await this.model.updateLessonById(id, moduleId, title, content);

      return { status: 'SUCCESSFUL', data: lesson };
    }
    catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: `Erro ao atualizar lição: ${error}` } };
    }
  }

  async deleteLessonById(id: number) {
    try {
      const lesson = await this.model.deleteLessonById(id);

      return { status: 'SUCCESSFUL', data: lesson };
    }
    catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: `Erro ao deletar lição: ${error}` } };
    }
  }
}   

export default LessonsService;
