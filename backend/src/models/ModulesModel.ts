import ModulesSequelize from '../database/models/Modules.model';
import { IModulesModel } from '../interfaces/IModules';

class ModulesModel implements IModulesModel {
  private model = ModulesSequelize;

  async createModule(courseId: number, title: string) {
    const module = await this.model.create({ courseId, title });

    return module;
  }

  async getModules() {
    const modules = await this.model.findAll();

    return modules;
  }

  async getModuleById(id: number) {
    const modules = await this.model.findAll({ where: { courseId: id } });

    return modules;
  }

  async getModuleByTitle(title: string) {
    const module = await this.model.findOne({ where: { title } });

    return module;
  }

  async updateModuleById(id: number, courseId: number, title: string) {
    const module = await this.model.update({ courseId, title }, { where: { id } });

    return module;
  }

  async deleteModuleById(id: number) {
    const module = await this.model.destroy({ where: { id } });

    return module;
  }
}

export default ModulesModel;