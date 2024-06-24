import ModulesProgressController from '../controller/ModulesProgress.controller';
import { Request, Response } from "express";
import { Router } from "express";
import { validateToken } from "../middlewares/validateLogin";

const modulesProgressRouter = Router();
const modulesProgressController = new ModulesProgressController();

modulesProgressRouter.get('/modulesProgress/:userId/:courseId', validateToken, (req: Request, res: Response) => 
  modulesProgressController.requestModulesProgressByUserIdAndCourseId(req, res));

modulesProgressRouter.put('/modulesProgress', validateToken, (req: Request, res: Response) =>
  modulesProgressController.requestUpdateModuleProgress(req, res));

export default modulesProgressRouter;