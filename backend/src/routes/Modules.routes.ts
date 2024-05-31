import { Router } from 'express';
import ModulesController from '../controller/Modules.controller';
import { Request, Response } from 'express';

const moduleRouter = Router();
const modulesController = new ModulesController();

moduleRouter.get('/modules',  (req: Request, res: Response) => modulesController.getModules(req, res));
moduleRouter.post('/modules',  (req: Request, res: Response) => modulesController.createModule(req, res));
moduleRouter.get('/modules/:courseId',  (req: Request, res: Response) => modulesController.getModulesByCourseId(req, res));
moduleRouter.get('/module/:id',  (req: Request, res: Response) => modulesController.getModuleById(req, res));
moduleRouter.put('/modules/:id',  (req: Request, res: Response) => modulesController.updateModuleById(req, res));
moduleRouter.delete('/modules/:id',  (req: Request, res: Response) => modulesController.deleteModuleById(req, res));

export default moduleRouter;