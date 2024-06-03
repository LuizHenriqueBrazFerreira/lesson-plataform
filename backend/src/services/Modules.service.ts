import { IModulesService } from '../interfaces/IModules';
import CoursesModel from '../models/CoursesModel';
import ModulesModel from '../models/ModulesModel';

class ModulesService implements IModulesService {
  private modulesModel = new ModulesModel();
  private _coursesModel = new CoursesModel()

  async createModule(courseTitle: string, title: string) {
    try {
      const courseExists = await this._coursesModel.getCourseByTitle(courseTitle);

      if(!courseExists) return { status: 'NOT_FOUND', data: { message: 'Curso não encontrado.' } };

      if(!title) return { status: 'BAD_REQUEST', data: { message: 'Título do módulo é obrigatório.' } };
      
      const courseId = courseExists.id;
      const module = await this.modulesModel.createModule(courseId, title);

      return { status: 'CREATED', data: module}
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar módulo.' } };
    }
  }

  async getModules() {
    try {
      const modules = await this.modulesModel.getModules();

      return { status: 'SUCCESSFUL', data: modules };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar módulos.' } };
    }
  }

  async getModuleById(id: number) {
    try {
      const module = await this.modulesModel.getModuleById(id);

      return { status: 'SUCCESSFUL', data: module };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar módulo.' } };
    }
  }

  async getModulesByCourseId(courseId: number) {
    try {
      const modules = await this.modulesModel.getModulesByCourseId(courseId);

      return { status: 'SUCCESSFUL', data: modules };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar módulos.' } };
    }
  }

  async updateModuleById(id: number, courseId: number, title: string) {
    try {
      const updatedModule = await this.modulesModel.updateModuleById(id, courseId, title);

      return { status: 'SUCCESSFUL', data: updatedModule };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao atualizar módulo.' } };  
    }
  }

  async deleteModuleById(id: number) {
    try {
      const deletedModule = await this.modulesModel.deleteModuleById(id);

      return { status: 'SUCCESSFUL', data: deletedModule };

    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao deletar módulo.' } };
    }
  }
}

export default ModulesService;