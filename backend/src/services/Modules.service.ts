import { IModulesService } from '../interfaces/IModules';
import ModulesModel from '../models/ModulesModel';

class ModulesService implements IModulesService {
  private modulesModel = new ModulesModel();

  async createModule(courseId: number, title: string) {
    try {
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