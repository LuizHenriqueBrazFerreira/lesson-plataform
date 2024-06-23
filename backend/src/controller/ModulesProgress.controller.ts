import ModulesProgressService from '../services/ModulesProgress.service';
import { IModulesProgressController } from '../interfaces/IModulesProgress';
import mapStatusHTTP from '../utils/mapHttp';

export default class ModulesProgressController implements IModulesProgressController {
  constructor(private _service = new ModulesProgressService()) {};

  async requestModulesProgressByUserIdAndCourseId(req: any, res: any) {
    const { userId, courseId } = req.params;

    const modulesProgress = await this._service.getModulesProgressByUserIdAndCourseId(Number(userId), Number(courseId));

    return res.status(mapStatusHTTP(modulesProgress.status)).json(modulesProgress.data);
  }

  async requestUpdateModuleProgress(req: any, res: any) {
    const { userId, moduleId, progress } = req.body;

    const updatedModuleProgress = await this._service.updateModuleProgress(Number(userId), Number(moduleId), Number(progress));

    return res.status(mapStatusHTTP(updatedModuleProgress.status)).json(updatedModuleProgress.data);
  }
}