import ModulesProgressSequelize from '../database/models/ModulesProgress';
import { IModulesProgressModel } from '../interfaces/IModulesProgress';

export default class ModulesProgressModel implements IModulesProgressModel {
  private _model = ModulesProgressSequelize;

  async createModuleProgress(userId: number, courseId: number, moduleId: number) {
    const created = await this._model.create({ userId, courseId, moduleId, progress: 0 });

    return created;
  }

  async getModulesProgressByUserIdAndCourseId(userId: number, courseId: number) {
    return await this._model.findAll({ where: { userId, courseId } });
  }

  async updateModuleProgress(userId: number, moduleId: number, progress: number) {
    return await this._model.update(
      { progress },
      {
        where: {
          userId,
          moduleId,
        }
      }
    );
  }
   
}