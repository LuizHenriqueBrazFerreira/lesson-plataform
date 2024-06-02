import { Router } from 'express';
import ModulesController from '../controller/Modules.controller';
import { Request, Response } from 'express';
import { validateToken } from '../middlewares/validateLogin';
import validateAdmin from '../middlewares/validateAdmin';
import validateModuleAccess from '../middlewares/validateModuleAccess';

const moduleRouter = Router();
const modulesController = new ModulesController();

moduleRouter.get('/modules',  validateToken, validateAdmin, (req: Request, res: Response) => modulesController.getModules(req, res));
moduleRouter.post('/modules',  validateToken, validateAdmin, (req: Request, res: Response) => modulesController.createModule(req, res));
moduleRouter.get('/modules/:courseId',  validateToken, (req: Request, res: Response) => modulesController.getModulesByCourseId(req, res));
moduleRouter.get('/module/:moduleId',  validateToken, validateModuleAccess, (req: Request, res: Response) => modulesController.getModuleById(req, res));
moduleRouter.put('/modules/:id',  validateToken, validateAdmin, (req: Request, res: Response) => modulesController.updateModuleById(req, res));
moduleRouter.delete('/modules/:id',  validateToken, validateAdmin, (req: Request, res: Response) => modulesController.deleteModuleById(req, res));

export default moduleRouter;