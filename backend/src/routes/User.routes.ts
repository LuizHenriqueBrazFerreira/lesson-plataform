import {Router} from 'express'
import UserController from '../controller/User.controller' 


const userRouter = Router()

userRouter.post('/create-account', UserController.registerUser)
userRouter.post('/login', UserController.requestUserByEmail)

export default userRouter