import express from 'express'
import routes from '../routes'

const app = express()

app.use(express.json())
app.use(routes.lessonRouter)
app.use(routes.userRouter)

export default app;