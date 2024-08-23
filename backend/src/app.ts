import express from 'express'
import routes from './routes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors());
app.use('/api',routes.lessonRouter)
app.use('/api', routes.userRouter)
app.use('/api', routes.courseRouter)
app.use('/api', routes.moduleRouter)
app.use('/api', routes.userCoursesRouter)
app.use('/api', routes.pdfLessonRouter)
app.use('/api', routes.watchedLessonsRouter)
app.use('/api', routes.modulesProgressRouter)
app.use('/api', routes.searchBarRouter)

export default app;