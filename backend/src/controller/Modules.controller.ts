import { IModulesController } from '../interfaces/IModules';
import { Request, Response } from 'express';
import ModulesService from '../services/Modules.service';
import mapStatusHTTP from '../utils/mapHttp';

class ModulesController implements IModulesController {
  constructor(private modulesService = new ModulesService()) {}

  async createModule(req: Request, res: Response) {
    const { courseId, title } = req.body;

    const { status, data } = await this.modulesService.createModule(courseId, title);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getModules(req: Request, res: Response) {
    const { status, data } = await this.modulesService.getModules();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getModuleById(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.modulesService.getModuleById(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateModuleById(req: Request, res: Response) {
    const { id } = req.params;
    const { courseId, title } = req.body;

    const { status, data } = await this.modulesService.updateModuleById(Number(id), courseId, title);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async deleteModuleById(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.modulesService.deleteModuleById(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default ModulesController;