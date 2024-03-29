import LessonsController from "../controller/Lessons.controller";
import {Router} from 'express'

const lessonRouter = Router()

lessonRouter.get('/lessons', LessonsController.requestAllLessons)

export default lessonRouter