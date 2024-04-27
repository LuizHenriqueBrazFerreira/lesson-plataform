import LessonsController from '../controller/Lessons.controller';
import {Router} from 'express'

const lessonRouter = Router()

lessonRouter.get('/lessons', LessonsController.requestAllLessons)
lessonRouter.delete('/lessons/:id', LessonsController.requestDeleteLesson)
lessonRouter.put('/lessons/:id', LessonsController.requestUpdateLesson)
lessonRouter.post('/lessons', LessonsController.requestCreateLesson)
lessonRouter.get('/lesosns/:id', LessonsController.requestLessonById)

export default lessonRouter;