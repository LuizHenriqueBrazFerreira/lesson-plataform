import {Router} from 'express'
import UserController from '../controller/User.controller' 


const userRouter = Router()

userRouter.post('/create-account', UserController.registerUser)
userRouter.post('/login', UserController.requestUserByEmail)
userRouter.put('/confirm', UserController.confirmEmail)
userRouter.post('/resend-email', UserController.resendEmail)
userRouter.post('/forgot-password', UserController.forgotPassword)
userRouter.put('/reset-password', UserController.resetPassword)

export default userRouter;