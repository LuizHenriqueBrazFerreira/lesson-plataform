import UserCoursesModel from '../models/UserCoursesModel';
import WatchedLessonModel from '../models/WatchedLessons.model';
import ModulesProgressModel from '../models/ModulesProgressModel';
import CoursesModel from '../models/CoursesModel';
import ModulesModel from '../models/ModulesModel';
import LessonsModel from '../models/LessonsModel';

export const giveAccessToAll = async (userId: number) => {
  const userCoursesModel = new UserCoursesModel();
  const watchedLessonModel = new WatchedLessonModel();
  const modulesProgressModel = new ModulesProgressModel();
  const coursesModel = new CoursesModel();
  const modulesModel = new ModulesModel();
  const lessonsModel = new LessonsModel();

  const courses = await coursesModel.getCourses();

  for (const course of courses) {
    const modules = await modulesModel.getModulesByCourseId(course.id);

    for (const module of modules) {
      const lessons = await lessonsModel.getLessonsByModuleId(module.id);

      for (const lesson of lessons) {
        await watchedLessonModel.createWatchedLesson(userId, module.id, lesson.id);
      }

      await modulesProgressModel.createModuleProgress(userId, course.id, module.id);
    }

    await userCoursesModel.createUserCourse({ userId, courseTitle: course.title, courseId: course.id });
  }
};

export const giveAcessToOne = async (userId: number, courseId: number) => {
  const userCoursesModel = new UserCoursesModel();
  const watchedLessonModel = new WatchedLessonModel();
  const modulesProgressModel = new ModulesProgressModel();
  const coursesModel = new CoursesModel();
  const modulesModel = new ModulesModel();
  const lessonsModel = new LessonsModel();

  const modules = await modulesModel.getModulesByCourseId(courseId);

  for (const module of modules) {
    const lessons = await lessonsModel.getLessonsByModuleId(module.id);

    for (const lesson of lessons) {
      await watchedLessonModel.createWatchedLesson(userId, module.id, lesson.id);
    }

    await modulesProgressModel.createModuleProgress(userId, courseId, module.id);
  }

  const course = await coursesModel.getCourseById(courseId);

  if (!course) return;

  const userCourse = await userCoursesModel.createUserCourse({ userId, courseTitle: course.title, courseId: course.id });

  return userCourse;
}
  