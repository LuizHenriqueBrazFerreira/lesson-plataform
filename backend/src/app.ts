import express from 'express'
import routes from './routes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors());
app.use(routes.lessonRouter)
app.use(routes.userRouter)
app.use(routes.courseRouter)
app.use(routes.moduleRouter)
app.use(routes.userCoursesRouter)
app.use(routes.pdfLessonRouter)
app.use(routes.watchedLessonsRouter)
app.use(routes.modulesProgressRouter)

export default app;