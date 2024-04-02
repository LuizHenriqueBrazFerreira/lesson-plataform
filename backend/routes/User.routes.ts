import {Router} from 'express'
import UserController from '../src/controller/User.controller' 


const userRouter = Router()

userRouter.post('/users', UserController.registerUser)
userRouter.get('/users', UserController.requestUserByEmail)

export default userRouter