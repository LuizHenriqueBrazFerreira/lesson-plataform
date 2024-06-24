import ModulesProgressModel from '../models/ModulesProgressModel';
import { IModulesProgressService } from '../interfaces/IModulesProgress';

export default class ModulesProgressService implements IModulesProgressService {
  constructor(private _model = new ModulesProgressModel()) {};

  async getModulesProgressByUserIdAndCourseId(userId: number, courseId: number) {
    const modulesProgress = await this._model.getModulesProgressByUserIdAndCourseId(userId, courseId);
    
    if (modulesProgress) return { status: 'SUCCESSFUL', data:  modulesProgress  };

    return { status: 'NOT_FOUND', data: { message: 'Progresso do módulo não encontrado.' } };
  }

  async updateModuleProgress(userId: number, moduleId: number, progress: number) {
    const updatedModuleProgress = await this._model.updateModuleProgress(userId, moduleId, progress);

    if (updatedModuleProgress) return { status: 'SUCCESSFUL', data: updatedModuleProgress };

    return { status: 'NOT_FOUND', data: { message: 'Progresso do módulo não encontrado.' } };
  }
}