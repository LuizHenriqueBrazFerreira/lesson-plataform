import {Router} from 'express'
import UsersController from '../controller/User.controller' 
import { Request, Response } from 'express';

const userController = new UsersController();
const userRouter = Router()

userRouter.post('/create-account', (req: Request, res: Response) => userController.registerUser(req, res));
userRouter.post('/login', (req: Request, res: Response) => userController.requestUserByEmail(req, res));
userRouter.put('/confirm',  (req: Request, res: Response) => userController.confirmEmail(req, res));
userRouter.post('/resend-email',  (req: Request, res: Response) => userController.resendEmail(req, res));
userRouter.post('/forgot-password',  (req: Request, res: Response) => userController.forgotPassword(req, res));
userRouter.put('/reset-password',  (req: Request, res: Response) => userController.resetPassword(req, res));
userRouter.post('/profile',  (req: Request, res: Response) => userController.requestProfileData(req, res));
userRouter.put('/profile',  (req: Request, res: Response) => userController.updateProfileData(req, res));

export default userRouter;