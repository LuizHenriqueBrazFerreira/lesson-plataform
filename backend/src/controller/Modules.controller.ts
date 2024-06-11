import { IModulesController } from '../interfaces/IModules';
import { Request, Response } from 'express';
import ModulesService from '../services/Modules.service';
import mapStatusHTTP from '../utils/mapHttp';

class ModulesController implements IModulesController {
  constructor(private modulesService = new ModulesService()) {}

  async createModule(req: Request, res: Response) {
    const { courseTitle, title } = req.body;

    const { status, data } = await this.modulesService.createModule(courseTitle, title);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getModules(_req: Request, res: Response) {
    const { status, data } = await this.modulesService.getModules();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getModuleById(req: Request, res: Response) {
    const { moduleId } = req.params;

    const { status, data } = await this.modulesService.getModuleById(Number(moduleId));

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getModulesByCourseId(req: Request, res: Response) {
    const { courseId } = req.params;
    const courses = req.user?.courses.map((course) => course.courseId);
    const role = req.user?.role;

    if (!courses?.includes(Number(courseId)) && role !== 'ADMIN') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { status, data } = await this.modulesService.getModulesByCourseId(Number(courseId));

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateModuleById(req: Request, res: Response) {
    const { moduleId } = req.params;
    const { courseId, title } = req.body;

    const { status, data } = await this.modulesService.updateModuleById(Number(moduleId), courseId, title);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async deleteModuleById(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.modulesService.deleteModuleById(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default ModulesController;