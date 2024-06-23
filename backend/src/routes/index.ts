import lessonRouter from "./lessons.routes";
import userRouter from './User.routes'
import courseRouter from './Courses.routes'
import moduleRouter from './Modules.routes'
import userCoursesRouter from './UserCourses.routes'
import pdfLessonRouter from './PdfLesson.routes'
import watchedLessonsRouter from "./WatchedLessons.routes";
import modulesProgressRouter from './ModulesProgress.routes';

export default {lessonRouter,
  userRouter,
  courseRouter,
  moduleRouter,
  userCoursesRouter,
  watchedLessonsRouter,
  pdfLessonRouter,
  modulesProgressRouter
}
